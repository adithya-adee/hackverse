import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamService {
    constructor(private readonly prisma: PrismaService) {}

    async createTeam(data: Omit<CreateTeamDto, 'createdById'>, userId: string) {
        return await this.prisma.team.create({
          data: {
            ...data,
            createdById: userId,
          },
        });
    }
      

    //async createTeamReq()

    //async getAllTeamReq()

    //check if participant is registered
    //async checkRegistration()

    //participant accepts the invite--->delete teamMemReq and create teamMem 
    //async createTeamMember()

    //async deleteTeamReq()

}
