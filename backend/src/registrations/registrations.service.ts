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
}
