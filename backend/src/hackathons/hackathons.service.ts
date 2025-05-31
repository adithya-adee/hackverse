import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { FindHackathonDto } from './dto/find-hackathon.dto';
import type { UpcomingHackathonDto } from './dto/get-upcoming-hackathon.dto';
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

    return response;
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
        }),
      ),
      createdAt: hackathon.createdAt ?? undefined,
    };
  }

  async createHackathon(createHackathonDto: CreateHackathonDto) {
    const { createdById, ...hackathonData } = createHackathonDto;

    const hackathon = await this.prisma.hackathon.create({
      data: {
        ...hackathonData,
        User: { connect: { id: createdById } },
      },
      include: {
        User: { select: { id: true, name: true, profileImageUrl: true } },
      },
    });

    return {
      ...hackathon,
      createdBy: hackathon.User,
    };
  }

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
}
