import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { CreateTeamReqDto } from './dto/create-team-req.dto';
import { TeamRequest } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async createTeam(data: CreateTeamDto, userId: string) {
    return await this.prisma.team.create({
      data: {
        ...data,
        createdById: userId,
      },
    });
  }

  async createTeamReq(data: CreateTeamReqDto){
    const now = new Date()
  
    // Calculate expiration date (2 days from now)
    const expiresAt = new Date(now)
    expiresAt.setDate(now.getDate() + 2)
    return await this.prisma.teamRequest.create({
      data: {
        ...data,
        expiresAt
      }
    })
  }

  async getAllTeamReq(userId: string): Promise<TeamRequest[]> {
    return this.prisma.teamRequest.findMany({
      where: { 
        userId,
        expiresAt:{
          gt: new Date(),
        }
      },
      include: {
        team: true,
      },
    });
  }

  //check if participant is registered
  async checkRegistration(userId: string, hackathonId: string): Promise<boolean> {
    const registration = await this.prisma.hackathonRegistration.findUnique({
      where: {
        userId_hackathonId: {
          userId,
          hackathonId,
        },
      },
    });

    return !!registration;
  }

  //participant accepts the invite--->delete teamMemReq and create teamMem
  async createTeamMember(userId: string, teamId: string) {


    const teamReq = await this.prisma.teamRequest.findUnique({where:{
      teamId_userId:{
        teamId,
        userId
      }
    }})

    // If request exists, delete it
    if (teamReq) {
      await this.deleteTeamReq(userId, teamId); // Make sure this function is awaited
    }

    // Check if the user is the team leader
    const team = await this.prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });

    if (!team) {
      throw new Error('Team not found');
    }

    const isLeader = team?.createdById === userId;

    // Create the team member
    return this.prisma.teamMember.create({
      data: {
        teamId,
        userId,
        isLeader,
      },
    });
  }

  async deleteTeamReq(userId: string, teamId: string){
    return await this.prisma.teamRequest.delete({
      where:{
        teamId_userId: {
          teamId,
          userId
        }
      }
    })
  }
}
