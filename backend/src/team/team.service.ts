import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { CreateTeamReqDto } from './dto/create-team-req.dto';
import { Team, TeamRequest } from '@prisma/client';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async getTeamCount() {
    const respone = await this.prisma.team.count();
    return respone;
  }

  async createTeam(data: CreateTeamDto, userId: string) {
    // Create the team
    const team = await this.prisma.team.create({
      data: {
        ...data,
        createdById: userId,
      },
    });

    // Also create a team member entry for the creator as leader
    await this.prisma.teamMember.create({
      data: {
        teamId: team.id,
        userId,
        isLeader: true,
      },
    });

    await this.prisma.teamRequest.deleteMany({
      where: {
        userId,
      },
    });

    return team;
  }

  async updateTeam(data: UpdateTeamDto, userId: string) {
    // 1. Get the team
    const team = await this.getTeamById(data.teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // 2. Check if the user is the team leader
    if (team.createdById !== userId) {
      throw new ForbiddenException('You are not allowed to update this team');
    }

    // 3. Update the team
    const updatedTeam = await this.prisma.team.update({
      where: { id: data.teamId },
      data: {
        name: data.name,
        description: data.description,
        requiredSkills: data.requiredSkills,
        lookingForMembers: data.lookingForMembers,
      },
    });

    // 4. Return the updated data
    return {
      statusCode: 200,
      message: 'Team updated successfully',
      data: updatedTeam,
    };
  }

  async createTeamReq(data: CreateTeamReqDto) {
    const now = new Date();

    // Check if the user is already in the team
    const existingMember = await this.prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId: data.teamId,
          userId: data.userId,
        },
      },
    });

    if (existingMember) {
      throw new UnauthorizedException('You are already a member of this team');
    }

    // Check if a request already exists
    const existingRequest = await this.prisma.teamRequest.findUnique({
      where: {
        teamId_userId: {
          teamId: data.teamId,
          userId: data.userId,
        },
      },
    });

    if (existingRequest) {
      throw new UnauthorizedException(
        'You have already requested to join this team',
      );
    }

    // Calculate expiration date (2 days from now)
    const expiresAt = new Date(now);
    expiresAt.setDate(now.getDate() + 2);

    return await this.prisma.teamRequest.create({
      data: {
        ...data,
        isSentByTeam: data.isSentByTeam,
        expiresAt,
      },
    });
  }

  async getAllTeamReqbyTeam(userId: string): Promise<TeamRequest[]> {
    return this.prisma.teamRequest.findMany({
      where: {
        userId,
        expiresAt: {
          gt: new Date(),
        },
        isSentByTeam: true,
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
            profileImageUrl: true,
          },
        },
        team: {
          include: {
            Hackathon: true,
          },
        },
      },
    });
  }

  async getAllTeamReqbyUser(userId: string): Promise<TeamRequest[]> {
    return this.prisma.teamRequest.findMany({
      where: {
        userId,
        expiresAt: {
          gt: new Date(),
        },
        isSentByTeam: false,
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
            profileImageUrl: true,
          },
        },
        team: {
          include: {
            Hackathon: true,
          },
        },
      },
    });
  }

  // Option 1: Database-level filtering (More efficient for large datasets)
  // async getTeamsLookingForMembers(hackathonId: string, userId: string) {
  //   const teams = await this.prisma.$queryRaw`
  //     SELECT
  //       t.*,
  //       h.id as hackathon_id,
  //       h.title as hackathon_title,
  //       h."maxTeamSize" as max_team_size,
  //       u.id as creator_id,
  //       u.name as creator_name,
  //       COALESCE(tm_count.member_count, 0) as member_count,
  //       (COALESCE(tm_count.member_count, 0) + 1) as current_size,
  //       (h."maxTeamSize" - (COALESCE(tm_count.member_count, 0) + 1)) as available_spots
  //     FROM "Team" t
  //     INNER JOIN "Hackathon" h ON t."hackathonId" = h.id
  //     INNER JOIN "User" u ON t."createdById" = u.id
  //     LEFT JOIN (
  //       SELECT "teamId", COUNT(*) as member_count
  //       FROM "TeamMember"
  //       GROUP BY "teamId"
  //     ) tm_count ON t.id = tm_count."teamId"
  //     WHERE
  //       t."hackathonId" = ${hackathonId}::uuid
  //       AND t."lookingForMembers" = true
  //       AND t."createdById" != ${userId}::uuid
  //       AND (COALESCE(tm_count.member_count, 0) + 1) < h."maxTeamSize"
  //     ORDER BY t."createdAt" DESC
  //   `;

  //   // Get detailed team member information for the filtered teams
  //   const teamIds = teams.map((team: any) => team.id);

  //   if (teamIds.length === 0) {
  //     return [];
  //   }

  //   const detailedTeams = await this.prisma.team.findMany({
  //     where: {
  //       id: {
  //         in: teamIds,
  //       },
  //     },
  //     include: {
  //       TeamMember: {
  //         include: {
  //           User: {
  //             select: {
  //               id: true,
  //               name: true,
  //               profileImageUrl: true,
  //             },
  //           },
  //         },
  //       },
  //       Hackathon: {
  //         select: {
  //           id: true,
  //           title: true,
  //           maxTeamSize: true,
  //         },
  //       },
  //       User: {
  //         select: {
  //           id: true,
  //           name: true,
  //         },
  //       },
  //       _count: {
  //         select: {
  //           TeamMember: true,
  //         },
  //       },
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   });

  //   // Transform the data to include additional computed fields
  //   return detailedTeams.map((team) => ({
  //     ...team,
  //     currentSize: team._count.TeamMember + 1, // Include creator in count
  //     maxSize: team.Hackathon.maxTeamSize,
  //     availableSpots: team.Hackathon.maxTeamSize - (team._count.TeamMember + 1),
  //     isAcceptingMembers: team.lookingForMembers && (team._count.TeamMember + 1) < team.Hackathon.maxTeamSize,
  //     fillPercentage: Math.round(((team._count.TeamMember + 1) / team.Hackathon.maxTeamSize) * 100),
  //   }));
  // }

  // Alternative Option 2: Pure Prisma approach (Simpler but potentially less efficient)
  async getTeamsLookingForMembers(hackathonId: string, userId: string) {
    const teams = await this.prisma.team.findMany({
      where: {
        hackathonId,
        lookingForMembers: true,
        createdById: {
          not: userId,
        },
      },
      include: {
        TeamMember: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
                profileImageUrl: true,
              },
            },
          },
        },
        Hackathon: {
          select: {
            id: true,
            title: true,
            maxTeamSize: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            TeamMember: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Filter out teams that have reached maximum capacity
    const availableTeams = teams.filter((team) => {
      const maxTeamSize = team.Hackathon.maxTeamSize;
      const currentMemberCount = team._count.TeamMember;

      // Add 1 to account for the team creator (createdById)
      const totalTeamSize = currentMemberCount + 1;

      // Only include teams that have space for more members
      return totalTeamSize < maxTeamSize;
    });

    // Transform the data to include additional computed fields for frontend
    return availableTeams.map((team) => ({
      ...team,
      currentSize: team._count.TeamMember + 1, // Include creator in count
      maxSize: team.Hackathon.maxTeamSize,
      availableSpots: team.Hackathon.maxTeamSize - (team._count.TeamMember + 1),
      isAcceptingMembers: true, // These are all available teams
      fillPercentage: Math.round(
        ((team._count.TeamMember + 1) / team.Hackathon.maxTeamSize) * 100,
      ),
    }));
  }

  async getTeamById(teamId: string) {
    const team = await this.prisma.team.findUnique({
      where: {
        id: teamId,
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
        Hackathon: true,
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    return team;
  }

  async getTeamMembers(teamId: string) {
    const team = await this.prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    return await this.prisma.teamMember.findMany({
      where: {
        teamId,
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImageUrl: true,
            type: true,
            institutionName: true,
            biography: true,
            Skill: true,
          },
        },
      },
    });
  }

  async getTeamRequestsByTeam(teamId: string, requestingUserId: string) {
    // Check if the requesting user is a team leader
    // const teamMember = await this.prisma.teamMember.findFirst({
    //   where: {
    //     teamId,
    //     userId: requestingUserId,
    //     isLeader: true,
    //   },
    // });

    // if (!teamMember) {
    //   throw new UnauthorizedException('Only team leaders can view team requests');
    // }

    return await this.prisma.teamRequest.findMany({
      where: {
        teamId,
        expiresAt: {
          gt: new Date(),
        },
        isSentByTeam: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImageUrl: true,
            type: true,
            institutionName: true,
            biography: true,
            Skill: true,
          },
        },
      },
    });
  }

  async getTeamRequestsByParticipants(
    teamId: string,
    requestingUserId: string,
  ) {
    // Check if the requesting user is a team leader
    // const teamMember = await this.prisma.teamMember.findFirst({
    //   where: {
    //     teamId,
    //     userId: requestingUserId,
    //     isLeader: true,
    //   },
    // });

    // if (!teamMember) {
    //   throw new UnauthorizedException('Only team leaders can view team requests');
    // }

    return await this.prisma.teamRequest.findMany({
      where: {
        teamId,
        expiresAt: {
          gt: new Date(),
        },
        isSentByTeam: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImageUrl: true,
            type: true,
            institutionName: true,
            biography: true,
            Skill: true,
          },
        },
      },
    });
  }

  async acceptTeamRequest(
    teamId: string,
    userId: string,
    requestingUserId: string,
  ) {
    // Check if the requesting user is a team leader
    const teamMember = await this.prisma.teamMember.findFirst({
      where: {
        teamId,
        userId: requestingUserId,
        isLeader: true,
      },
    });

    if (!teamMember) {
      throw new UnauthorizedException('Only team leaders can accept requests');
    }

    // Check team size limit
    const currentMembers = await this.prisma.teamMember.count({
      where: {
        teamId,
      },
    });

    const team = await this.prisma.team.findUnique({
      where: {
        id: teamId,
      },
      include: {
        Hackathon: true,
      },
    });

    if (team && currentMembers >= team.Hackathon.maxTeamSize) {
      throw new UnauthorizedException('Team size limit reached');
    }

    // Check if the request exists
    const request = await this.prisma.teamRequest.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });

    if (!request) {
      throw new NotFoundException('Team request not found');
    }

    // Delete the request
    await this.deleteTeamReq(userId, teamId);

    // Create the team member
    return this.prisma.teamMember.create({
      data: {
        teamId,
        userId,
        isLeader: false,
      },
    });
  }

  async acceptTeamRequestbyParticipant(teamId: string, userId: string) {
    const currentMembers = await this.prisma.teamMember.count({
      where: {
        teamId,
      },
    });

    const team = await this.prisma.team.findUnique({
      where: {
        id: teamId,
      },
      include: {
        Hackathon: true,
      },
    });

    if (team && currentMembers >= team.Hackathon.maxTeamSize) {
      throw new UnauthorizedException('Team size limit reached');
    }

    // Check if the request exists
    const request = await this.prisma.teamRequest.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });

    console.log('------------------------------------------------');
    console.log(userId);
    console.log(teamId);
    console.log(request);
    console.log('------------------------------------------------');

    if (!request) {
      throw new NotFoundException('Team request not found');
    }

    // Delete the request
    await this.deleteTeamReq(userId, teamId);

    // Create the team member
    return this.prisma.teamMember.create({
      data: {
        teamId,
        userId,
        isLeader: false,
      },
    });
  }

  async rejectTeamRequest(
    teamId: string,
    userId: string,
    requestingUserId: string,
  ) {
    // Check if the requesting user is a team leader
    const teamMember = await this.prisma.teamMember.findFirst({
      where: {
        teamId,
        userId: requestingUserId,
        isLeader: true,
      },
    });

    if (!teamMember) {
      throw new UnauthorizedException('Only team leaders can reject requests');
    }

    return await this.deleteTeamReq(userId, teamId);
  }

  async getAllTeam() {
    return await this.prisma.team.findMany({
      include: {
        TeamMember: {
          include: {
            User: {
              select: {
                name: true,
                profileImageUrl: true,
              },
            },
          },
        },
        Hackathon: {
          select: {
            id: true,
            title: true,
            maxTeamSize: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // User accepts team invite or joins a team
  async createTeamMember(userId: string, teamId: string) {
    const teamReq = await this.prisma.teamRequest.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });

    // If request exists, delete it
    if (teamReq) {
      await this.deleteTeamReq(userId, teamId);
    }

    // Check if the user is the team leader
    const team = await this.prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
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

  async deleteTeamReq(userId: string, teamId: string) {
    return await this.prisma.teamRequest.delete({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });
  }

  async deleteTeam(teamId: string, userId: string) {
    const team = await this.getTeamById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // 2. Check if the user is the team leader
    if (team.createdById !== userId) {
      throw new ForbiddenException('You are not allowed to update this team');
    }

    const result = await this.prisma.team.delete({
      where: {
        id: teamId,
      },
    });

    if (!result) {
      throw new NotFoundException('Team not found');
    }
    return result;
  }

  // Get team by team member user ID and hackathon ID
  async getTeamByMemberAndHackathon(memberId: string, hackathonId: string) {
    try {
      const team = await this.prisma.team.findFirst({
        where: {
          hackathonId: hackathonId,
          TeamMember: {
            some: {
              userId: memberId,
            },
          },
        },
      });

      if (!team) {
        throw new NotFoundException(
          `No team found for user ${memberId} in hackathon ${hackathonId}`,
        );
      }

      return team;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch team: ${error.message}`);
    }
  }


  async removeFromTeam(teamId: string, userId: string) {
    try {
      const team = await this.getTeamById(teamId);
      if (!team) {
        throw new NotFoundException(`No team found for teamID ${teamId}`);
      }

      const delMem = await this.prisma.teamMember.delete({
        where: {
          teamId_userId: {
            teamId,
            userId
          }
        }
      });

      return delMem;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to remove from team: ${error.message}`);
    }
  }

}
