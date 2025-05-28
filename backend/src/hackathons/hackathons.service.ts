import { Injectable, Param, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateHackathonDto } from './dto/create-hackathon.dto';
// import { UpdateHackathonDto } from './dto/update-hackathon.dto';
// import { FindHackathonDto } from './dto/find-hackathon.dto';
import { response } from 'express';

// DTO interface for the response
export interface UpcomingHackathonDto {
  id: string;
  title: string;
  description: string;
  bannerImageUrl: string | null;
  startDate: Date;
  mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  maxTeamSize: number;
  tags: string[];
  registeredParticipants: number;
}

export interface FindHackathonDto {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  registrationDate: Date;
  location?: string;
  maxTeamSize: number;
  mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  bannerImageUrl?: string;
  createdBy: {
    id: string;
    name: string;
    profileImageUrl?: string;
  };
  registeredParticipants: number;
  tags: string[];
  tabs: {
    title: string;
    content: string; // Markdown content
  }[];
}

@Injectable()
export class HackathonsService {
  constructor(private readonly prisma: PrismaService) {}


  async getAllUpcomingHackathons(): Promise<UpcomingHackathonDto[]> {
  const response = await this.prisma.hackathon.findMany({
    where: {
      status: 'UPCOMING' // Only fetch upcoming hackathons
    },
    include: {
      HackathonTag: true, // Include tags
      HackathonRegistration: true, // Include registrations to count participants
      _count: {
        select: {
          HackathonRegistration: true // Count registered participants
        }
      }
    },
    orderBy: {
      startDate: 'asc' // Order by start date (earliest first)
    }
  });

  return response.map((hackathon) => ({
      id: hackathon.id,
      title: hackathon.title,
      description: hackathon.description ?? '',
      bannerImageUrl: hackathon.bannerImageUrl ?? null,
      startDate: hackathon.startDate,
      mode: hackathon.mode ?? 'ONLINE',
      maxTeamSize: hackathon.maxTeamSize,
      tags: hackathon.HackathonTag.map(tag => tag.name),
      registeredParticipants: hackathon._count.HackathonRegistration
    }));
  }



  
async getHackathonById(@Param('id') id: string): Promise<FindHackathonDto> {
  const hackathon = await this.prisma.hackathon.findFirst({
    where: {
      id: id,
    },
    include: {
      User: {
        select: {
          id: true,
          name: true,
          profileImageUrl: true,
        },
      },
      HackathonRegistration: {
        select: {
          userId: true,
        },
      },
      HackathonTag: {
        select: {
          name: true,
        },
      },
      HackathonTab: {
        select: {
          title: true,
          content: true,
          order: true,
        },
        where: {
          isVisible: true,
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  if (!hackathon) {
    throw new Error('Hackathon Not found');
  }

  return {
    id: hackathon.id,
    title: hackathon.title,
    description: hackathon.description ?? undefined,
    startDate: hackathon.startDate,
    endDate: hackathon.endDate,
    registrationDate: hackathon.registrationDate,
    location: hackathon.location ?? undefined,
    maxTeamSize: hackathon.maxTeamSize,
    mode: hackathon.mode as 'ONLINE'|'OFFLINE'|'HYBRID',  
    status: hackathon.status,
    bannerImageUrl: hackathon.bannerImageUrl ?? undefined,
    createdBy: {
      id: hackathon.User.id,
      name: hackathon.User.name,
      profileImageUrl: hackathon.User.profileImageUrl ?? undefined,
    },
    registeredParticipants: hackathon.HackathonRegistration.length,
    tags: hackathon.HackathonTag.map(tag => tag.name),
    tabs: hackathon.HackathonTab.map(tab => ({
      title: tab.title,
      content: tab.content,
    })),
  };
}

  
  // async getHackathonById(@Param('id') id: string): Promise<FindHackathonDto> {
  //   const hackathon = await this.prisma.hackathon.findFirst({
  //     where: {
  //       id: id,
  //     },
  //   });

  //   if (!hackathon) {
  //     throw new Error('Hackathon Not found');
  //   }

  //   return {
  //     ...hackathon,
  //     description: hackathon.description ?? undefined,
  //     rules: hackathon.rules ?? undefined,
  //     prize: hackathon.prize ?? undefined,
  //     bannerImageUrl: hackathon.bannerImageUrl ?? undefined,
  //   };
  // }

  // async createHackathon(createHackathonDto: CreateHackathonDto) {
  //   const { createdById, ...hackathonData } = createHackathonDto;
  //   const response = await this.prisma.hackathon.create({
  //     data: {
  //       ...hackathonData,
  //       User: {
  //         connect: {
  //           id: createdById
  //         }
  //       }
  //     },
  //   });
  //   return response;
  // }

  // async updateHackathonDetails(
  //   id: string,
  //   updateHackathonDto: UpdateHackathonDto,
  // ) {
  //   const { User, ...rest } = updateHackathonDto;
  //   if (!User) {
  //     throw new UnauthorizedException('User required');
  //   }
  //   const response = await this.prisma.hackathon.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       ...rest,
  //       User: { connect: { id: User.id } },
  //     },
  //   });
  //   return response;
  // }

  // async deleteHackathon(id: string) {
  //   const response = await this.prisma.hackathon.delete({
  //     where: {
  //       id,
  //     },
  //   });
  //   return response;
  // }
}
