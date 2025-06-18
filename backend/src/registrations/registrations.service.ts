import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HackathonRegistration } from '@prisma/client';

@Injectable()
export class RegistrationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    hackathonId: string,
  ): Promise<HackathonRegistration> {
    try {
      // Check if user is already registered
      const existing = await this.prisma.hackathonRegistration.findUnique({
        where: {
          userId_hackathonId: {
            userId,
            hackathonId,
          },
        },
      });

      if (existing) {
        throw new ConflictException(
          'User is already registered for this hackathon',
        );
      }

      return await this.prisma.hackathonRegistration.create({
        data: { userId, hackathonId },
      });
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new Error('Failed to register for hackathon');
    }
  }

  async getRegisteredHackathons(
    userId: string,
  ): Promise<HackathonRegistration[]> {
    return await this.prisma.hackathonRegistration.findMany({
      where: { userId },
      include: {
        Hackathon: true, // Include hackathon details
      },
    });
  }

  async getSubmissionCount() {
    return await this.prisma.submission.count();
  }

  async remove(userId: string, hackathonId: string): Promise<void> {
    try {
      await this.prisma.hackathonRegistration.delete({
        where: {
          userId_hackathonId: {
            userId,
            hackathonId,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Registration not found');
    }
  }


  async checkRegistration(
    userId: string,
    hackathonId: string,
  ): Promise<boolean> {
    const registration = await this.prisma.hackathonRegistration.findUnique({
      where: {
        userId_hackathonId: {
          userId,
          hackathonId,
        },
      },
    });

    // The !! operator converts the value to a boolean
    // If registration exists (not null/defined), it returns true
    // If registration doesn't exist (null/undefined), it returns false
    return !!registration;
  }

  // async getAllRegistered(hackathonId: string) {

  //   return this.prisma.hackathonRegistration.findMany({
  //     where: { hackathonId },
  //     include: {
  //         User: true,
  //     },
  //   });
  // }
  async getAllRegistered(hackathonId: string, currentUserId: string) {
    // Step 1: Get all users already in teams for this hackathon
    const usersInTeams = await this.prisma.teamMember.findMany({
      where: {
        Team: {
          hackathonId,
        },
      },
      select: {
        userId: true,
      },
    });

    const userIdsToExclude = [
      ...new Set(usersInTeams.map((u) => u.userId).concat(currentUserId)),
    ];

    // Step 2: Return all registered users not in a team and not the current user
    return this.prisma.hackathonRegistration.findMany({
      where: {
        hackathonId,
        userId: {
          notIn: userIdsToExclude,
        },
      },
      include: {
        User: true,
      },
    });
  }

}
