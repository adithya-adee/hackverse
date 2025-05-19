import { Injectable, Param, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';

@Injectable()
export class HackathonsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHackthons() {
    const response = await this.prisma.hackathon.findMany({});
    return response;
  }

  async getHackathonById(@Param('id') id: string) {
    const response = await this.prisma.hackathon.findFirst({
      where: {
        id: id,
      },
    });

    return response;
  }

  async createHackathon(createHackathonDto: CreateHackathonDto) {
    const { User, ...rest } = createHackathonDto;
    const response = await this.prisma.hackathon.create({
      data: {
        ...rest,
        User: { connect: { id: User.id } },
      },
    });
    return response;
  }

  async updateHackathonDetails(
    id: string,
    updateHackathonDto: UpdateHackathonDto,
  ) {
    const { User, ...rest } = updateHackathonDto;
    if (!User) {
      throw new UnauthorizedException('User required');
    }
    const response = await this.prisma.hackathon.update({
      where: {
        id: id,
      },
      data: {
        ...rest,
        User: { connect: { id: User.id } },
      },
    });
    return response;
  }

  async deleteHackathon(id: string) {
    const response = await this.prisma.hackathon.delete({
      where: {
        id,
      },
    });
    return response;
  }
}
