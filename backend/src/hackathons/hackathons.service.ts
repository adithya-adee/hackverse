import {
  Injectable,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { FindHackathonDto } from './dto/find-hackathon.dto';
import type { UpcomingHackathonDto } from './dto/get-upcoming-hackathon.dto';
import { RoleType } from '@prisma/client';

@Injectable()
export class HackathonsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHackathons() {
    const response = await this.prisma.hackathon.findMany({
      include: {
        HackathonTag: true,
        HackathonTab: true,
      },
    });

    const count = await this.prisma.hackathon.count();

    return { response, count };
  }

  async getAllUpcomingHackathons(): Promise<UpcomingHackathonDto[]> {
    const response = await this.prisma.hackathon.findMany({
      where: {
        status: 'UPCOMING', // Only fetch upcoming hackathons
      },
      include: {
        HackathonTag: true,
        HackathonRegistration: true,
        _count: {
          select: {
            HackathonRegistration: true, // Count registered participants
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    // if (!response.length) {
    //   throw new NotFoundException('No upcoming Hackthons');
    // }

    return response.map((hackathon) => ({
      id: hackathon.id,
      title: hackathon.title,
      description: hackathon.description ?? '',
      bannerImageUrl: hackathon.bannerImageUrl ?? null,
      startDate: hackathon.startDate,
      mode: hackathon.mode ?? 'ONLINE',
      maxTeamSize: hackathon.maxTeamSize,
      tags: hackathon.HackathonTag.map((tag) => tag.name),
      registeredParticipants: hackathon._count.HackathonRegistration,
    }));
  }

  async getHackathonById(@Param('id') id: string): Promise<FindHackathonDto> {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id },
      include: {
        User: { select: { id: true, name: true, profileImageUrl: true } },
        HackathonRegistration: { select: { userId: true } },
        HackathonTag: { select: { name: true } },
        HackathonTab: {
          select: { title: true, content: true, order: true, isVisible: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!hackathon) throw new NotFoundException('Hackathon not found');

    return {
      id: hackathon.id,
      title: hackathon.title,
      description: hackathon.description ?? undefined,
      location: hackathon.location ?? undefined,
      mode: hackathon.mode ?? 'ONLINE',
      maxTeamSize: hackathon.maxTeamSize,
      createdBy: {
        id: hackathon.User.id,
        name: hackathon.User.name,
        profileImageUrl: hackathon.User.profileImageUrl ?? undefined,
      },
      registrationDate: hackathon.registrationDate,
      startDate: hackathon.startDate,
      endDate: hackathon.endDate,
      status: hackathon.status,
      bannerImageUrl: hackathon.bannerImageUrl ?? undefined,
      registeredParticipants: hackathon.HackathonRegistration.length,
      tags: hackathon.HackathonTag.map((tag) => tag.name),
      tabs: hackathon.HackathonTab.filter((tab) => tab.isVisible).map(
        (tab) => ({
          title: tab.title,
          content: tab.content,
          isVisible: tab.isVisible,
          order: tab.order,
        }),
      ),
      createdAt: hackathon.createdAt ?? undefined,
    };
  }

  async getSubmissionsByHackathonId(hackathonId: string, userId: string) {
    // Check permissions
    const canView = await this.canViewHackathonData(hackathonId, userId);
    if (!canView) {
      throw new UnauthorizedException(
        'You do not have permission to view this data',
      );
    }

    const submissions = await this.prisma.submission.findMany({
      where: {
        hackathonId,
      },
      include: {
        Team: {
          select: {
            name: true,
          },
        },
      },
    });

    return submissions;
  }

  async getParticipantsByHackathonId(hackathonId: string, userId: string) {
    // Check permissions
    const canView = await this.canViewHackathonData(hackathonId, userId);
    if (!canView) {
      throw new UnauthorizedException(
        'You do not have permission to view this data',
      );
    }

    // Get all participants registered for this hackathon
    const registrations = await this.prisma.hackathonRegistration.findMany({
      where: {
        hackathonId,
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImageUrl: true,
            TeamMember: {
              where: {
                Team: {
                  hackathonId,
                },
              },
              include: {
                Team: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Map the data to a more convenient structure
    const participants = registrations.map((reg) => ({
      id: reg.User.id,
      name: reg.User.name,
      email: reg.User.email,
      profileImageUrl: reg.User.profileImageUrl,
      registeredAt: reg.registeredAt,
      teamId: reg.User.TeamMember[0]?.Team?.id || null,
      teamName: reg.User.TeamMember[0]?.Team?.name || null,
      isTeamLeader: reg.User.TeamMember[0]?.isLeader || false,
    }));

    return participants;
  }

  // Helper method to check if the user can view hackathon data
  async canViewHackathonData(
    hackathonId: string,
    userId: string,
  ): Promise<boolean> {
    // Get the hackathon
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });

    if (!hackathon) {
      throw new NotFoundException('Hackathon not found');
    }

    // Get user's roles
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { Role: true },
    });

    const roles = userRoles.map((ur) => ur.Role.name);

    // User is admin or organizer
    if (roles.includes(RoleType.ADMIN) || roles.includes(RoleType.ORGANIZER)) {
      return true;
    }

    // User is the creator of the hackathon
    if (hackathon.createdById === userId) {
      return true;
    }

    // User is a moderator for this hackathon
    const isModerator = await this.prisma.hackathonModerator.findFirst({
      where: {
        hackathonId,
        userId,
      },
    });

    if (isModerator) {
      return true;
    }

    // User is registered for this hackathon
    const isRegistered = await this.prisma.hackathonRegistration.findFirst({
      where: {
        hackathonId,
        userId,
      },
    });

    // Registered participants can see limited hackathon data
    return !!isRegistered;
  }

  // New methods for hackathon dashboard
  async getTeamsByHackathonId(hackathonId: string, userId: string) {
    // First check if user has permission to view
    const canView = await this.canViewHackathonData(hackathonId, userId);
    if (!canView) {
      throw new UnauthorizedException(
        'You do not have permission to view this data',
      );
    }

    const teams = await this.prisma.team.findMany({
      where: {
        hackathonId,
      },
      include: {
        TeamMember: true,
      },
    });

    return teams;
  }

  async createHackathon(
    createdById: string,
    createHackathonDto: CreateHackathonDto,
  ) {
    const { tags, tabs, ...hackathonData } = createHackathonDto;
    const hackathon = await this.prisma.hackathon.create({
      data: {
        ...hackathonData,
        User: { connect: { id: createdById } },
      },
      // include: {
      //   User: { select: { id: true, name: true, profileImageUrl: true } },
      // },
    });

    console.log('hackathon created');
    console.log(hackathon);

    //creating tags...
    if (tags?.length) {
      await this.prisma.hackathonTag.createMany({
        data: tags.map((tag) => ({
          name: tag,
          hackathonId: hackathon.id,
        })),
      });
    }

    if (tabs?.length) {
      await this.prisma.hackathonTab.createMany({
        data: tabs.map((tab) => ({
          title: tab.title,
          content: tab.content,
          order: tab.order,
          isVisible: tab.isVisible,
          hackathonId: hackathon.id,
        })),
      });
    }

    return {
      data: {
        ...hackathon,
        createdBy: { id: createdById },
      },
    };
  }

  async validateUserHackathon(userId: string, hackathonId: string) {
    const response = await this.prisma.hackathon.findFirst({
      where: {
        id: hackathonId,
      },
    });

    return userId == response?.createdById;
  }

  // async createTags(id: string, tags: CreateTagDto) {
  //   const { name } = tags;
  //   const response = await this.prisma.hackathonTag.create({
  //     data: {
  //       hackathonId: id,
  //       name,
  //     },
  //   });

  //   return response;
  // }

  // async createTabs(id: string, tab: CreateTabDto) {
  //   const { title, content, order, isVisible } = tab;

  //   const response = await this.prisma.hackathonTab.create({
  //     data: {
  //       hackathonId: id,
  //       title,
  //       content,
  //       order,
  //       isVisible: isVisible !== undefined ? isVisible : true,
  //     },
  //   });

  //   return response;
  // }

  async updateHackathon(id: string, updateHackathonDto: UpdateHackathonDto) {
    const { tags, ...updateData } = updateHackathonDto;

    const existing = await this.prisma.hackathon.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Hackathon not found');

    const hackathon = await this.prisma.hackathon.update({
      where: { id },
      data: {
        ...updateData,
        HackathonTag: tags
          ? {
              deleteMany: {}, // Remove all old tags
              create: tags.map((name) => ({ name })),
            }
          : undefined,
      },
      include: {
        HackathonTag: true,
        User: { select: { id: true, name: true, profileImageUrl: true } },
      },
    });

    return {
      ...hackathon,
      tags: hackathon.HackathonTag.map((tag) => tag.name),
      createdBy: hackathon.User,
    };
  }

  async deleteHackathon(id: string) {
    const deleteHackathon = await this.prisma.hackathon.delete({
      where: {
        id,
      },
      include: {
        HackathonTag: true,
        HackathonTab: true,
      },
    });

    return deleteHackathon;
  }

  async registerParticipant(
    hackathonId: string,
    userId: string,
    userData: any,
  ) {
    // Check if hackathon exists and is open for registration
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
      include: {
        HackathonRegistration: {
          where: { userId },
        },
      },
    });

    if (!hackathon) {
      throw new NotFoundException('Hackathon not found');
    }

    if (hackathon.status !== 'UPCOMING') {
      throw new UnauthorizedException(
        'Registration is closed for this hackathon',
      );
    }

    if (hackathon.HackathonRegistration.length > 0) {
      throw new UnauthorizedException('Already registered for this hackathon');
    }

    // Create registration
    const registration = await this.prisma.hackathonRegistration.create({
      data: {
        userId,
        hackathonId,
      },
    });

    return registration;
  }
}
