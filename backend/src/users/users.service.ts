import {
  ConflictException,
  Injectable,
  NotFoundException,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleType } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import { User } from '@prisma/client';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<{ users: FindUserDto[]; count: number }> {
    const [users, count] = await Promise.all([
      this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          biography: true,
          profileImageUrl: true,
          resumeUrl: true,
          githubUrl: true,
          linkedinUrl: true,
          createdAt: true,
          updatedAt: true,
          UserRole: {
            include: {
              Role: true,
            },
          },
          Skill: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      this.prisma.user.count(),
    ]);
    return { users, count };
  }

  async findOne(id: string): Promise<FindUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        biography: true,
        profileImageUrl: true,
        institutionName: true,
        gender: true,
        type: true,
        phoneNo: true,
        resumeUrl: true,
        githubUrl: true,
        linkedinUrl: true,
        createdAt: true,
        updatedAt: true,
        UserRole: {
          include: {
            Role: true,
          },
        },
        Skill: true,
        // Only for recruiters and admins
        Hackathon: true,
        TeamMember: {
          include: {
            Team: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  //TODO: make a controller for this - will use during team finding (leader will enter email to find teammates)
  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    if (updateUserDto && updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    // Remove skill updates from general user update

    const updateUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!updateUser) {
      throw new NotFoundException('User not found');
    }

    console.log(updateUser);

    // Convert password: null to password: undefined for UpdateUserDto compatibility
    const { password, ...rest } = updateUser;
    return {
      ...rest,
      password: password === null ? undefined : password,
    } as UpdateUserDto;
  }

  async updateSkills(userId: string, skills: string[]) {
    try {
      // Validate if all skills exist or create new ones
      const existingSkills = await this.prisma.skill.findMany({
        where: {
          name: {
            in: skills,
          },
        },
      });

      const existingSkillNames = existingSkills.map((skill) => skill.name);
      const newSkills = skills.filter(
        (skill) => !existingSkillNames.includes(skill),
      );

      // Create new skills if they don't exist
      await this.prisma.skill.createMany({
        data: newSkills.map((name) => ({ name })),
        skipDuplicates: true,
      });

      // Connect all skills to the user
      return await this.prisma.user.update({
        where: { id: userId },
        data: {
          Skill: {
            set: [], // Disconnect all existing skills
            connect: skills.map((name) => ({ name })),
          },
        },
        include: {
          Skill: true, // Include updated skills in the response
        },
      });
    } catch (error) {
      console.error('Failed to update skills:', error);
      throw new Error('Failed to update skills');
    }
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // Organizer dashboard methods
  async getHackathonsByOrganizer(userId: string) {
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { Role: true },
    });

    const roles = userRoles.map((ur) => ur.Role.name);

    // Check if user is an organizer or admin
    if (
      !roles.includes(RoleType.ORGANIZER) &&
      !roles.includes(RoleType.ADMIN)
    ) {
      throw new UnauthorizedException(
        'You do not have permission to access organizer data',
      );
    }

    // Get hackathons created by this user
    const hackathons = await this.prisma.hackathon.findMany({
      where: {
        createdById: userId,
      },
      include: {
        HackathonTag: true,
        _count: {
          select: {
            HackathonRegistration: true,
            Team: true,
            Submission: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return hackathons;
  }

  async getTeamsByOrganizer(userId: string) {
    // Verify organizer role
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { Role: true },
    });

    const roles = userRoles.map((ur) => ur.Role.name);

    if (
      !roles.includes(RoleType.ORGANIZER) &&
      !roles.includes(RoleType.ADMIN)
    ) {
      throw new UnauthorizedException(
        'You do not have permission to access organizer data',
      );
    }

    // Get hackathons created by this user
    const hackathons = await this.prisma.hackathon.findMany({
      where: {
        createdById: userId,
      },
      select: { id: true },
    });

    const hackathonIds = hackathons.map((h) => h.id);

    // Get all teams for these hackathons
    const teams = await this.prisma.team.findMany({
      where: {
        hackathonId: {
          in: hackathonIds,
        },
      },
      include: {
        TeamMember: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
                email: true,
                profileImageUrl: true,
              },
            },
          },
        },
        Hackathon: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
    });

    return teams;
  }

  async getSubmissionsByOrganizer(userId: string) {
    // Verify organizer role
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { Role: true },
    });

    const roles = userRoles.map((ur) => ur.Role.name);

    if (
      !roles.includes(RoleType.ORGANIZER) &&
      !roles.includes(RoleType.ADMIN)
    ) {
      throw new UnauthorizedException(
        'You do not have permission to access organizer data',
      );
    }

    // Get hackathons created by this user
    const hackathons = await this.prisma.hackathon.findMany({
      where: {
        createdById: userId,
      },
      select: { id: true },
    });

    const hackathonIds = hackathons.map((h) => h.id);

    // Get all submissions for these hackathons
    const submissions = await this.prisma.submission.findMany({
      where: {
        hackathonId: {
          in: hackathonIds,
        },
      },
      include: {
        Team: {
          select: {
            id: true,
            name: true,
          },
        },
        Hackathon: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Rating: {
          select: {
            category: true,
            score: true,
          },
        },
      },
    });

    return submissions;
  }

  async getParticipantsByOrganizer(userId: string) {
    // Verify organizer role
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { Role: true },
    });

    const roles = userRoles.map((ur) => ur.Role.name);

    if (
      !roles.includes(RoleType.ORGANIZER) &&
      !roles.includes(RoleType.ADMIN)
    ) {
      throw new UnauthorizedException(
        'You do not have permission to access organizer data',
      );
    }

    // Get hackathons created by this user
    const hackathons = await this.prisma.hackathon.findMany({
      where: {
        createdById: userId,
      },
      select: { id: true },
    });

    const hackathonIds = hackathons.map((h) => h.id);

    // Get all participants for these hackathons
    const registrations = await this.prisma.hackathonRegistration.findMany({
      where: {
        hackathonId: {
          in: hackathonIds,
        },
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImageUrl: true,
            biography: true,
            linkedinUrl: true,
            githubUrl: true,
            TeamMember: {
              where: {
                Team: {
                  hackathonId: {
                    in: hackathonIds,
                  },
                },
              },
              include: {
                Team: {
                  select: {
                    id: true,
                    name: true,
                    hackathonId: true,
                  },
                },
              },
            },
          },
        },
        Hackathon: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Transform the data for easier use in the frontend
    const participants = registrations.map((reg) => ({
      id: reg.User.id,
      name: reg.User.name,
      email: reg.User.email,
      profileImageUrl: reg.User.profileImageUrl,
      biography: reg.User.biography,
      linkedinUrl: reg.User.linkedinUrl,
      githubUrl: reg.User.githubUrl,
      registeredAt: reg.registeredAt,
      hackathonId: reg.hackathonId,
      hackathonTitle: reg.Hackathon.title,
      teams: reg.User.TeamMember.map((tm) => ({
        teamId: tm.Team.id,
        teamName: tm.Team.name,
        hackathonId: tm.Team.hackathonId,
        isLeader: tm.isLeader,
      })),
    }));

    return participants;
  }

  async deleteSkill(id: { skillId: string }): Promise<any> {
    console.log(id);
    return await this.prisma.skill.delete({
      where: {
        id: id.skillId,
      },
    });
  }

  async deleteUserSkill(userId: string, skillId: string) {
    // Disconnect the skill from the user, but do not delete the skill itself
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        Skill: {
          disconnect: [{ id: skillId }],
        },
      },
      include: { Skill: true },
    });
  }
}
