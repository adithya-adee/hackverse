import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  UseGuards,
  Delete,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { HackathonsService } from './hackathons.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleType } from '@prisma/client';
import { Roles } from 'src/auth/decorator/role.decorator';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('hackathons')
export class HackathonsController {
  constructor(private readonly hackathonsService: HackathonsService) {}

  @Get()
  findAll() {
    return this.hackathonsService.getAllHackathons();
  }

  @Get('events')
  findAllEvents() {
    return this.hackathonsService.getAllHackathonEvents();
  }

  @Get('upcoming')
  findUpcomingHackathons() {
    console.log('upcoming');
    return this.hackathonsService.getAllUpcomingHackathons();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ORGANIZER, RoleType.ADMIN)
  create(
    @Request() req: { user: { userId: string } },
    @Body() createHackathonDto: CreateHackathonDto,
  ) {
    const hackathon = this.hackathonsService.createHackathon(
      req.user.userId,
      createHackathonDto,
    );
    return hackathon;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hackathonsService.getHackathonById(id);
  }

  @Get(':id/teams')
  @UseGuards(JwtAuthGuard)
  async getTeamsByHackathonId(
    @Param('id') hackathonId: string,
    @Request() req: { user: { userId: string } },
  ) {
    const userId = req.user.userId;
    return this.hackathonsService.getTeamsByHackathonId(hackathonId, userId);
  }

  @Get(':id/submissions')
  @UseGuards(JwtAuthGuard)
  async getSubmissionsByHackathonId(
    @Param('id') hackathonId: string,
    @Request() req: { user: { userId: string } },
  ) {
    const userId = req.user.userId;
    return this.hackathonsService.getSubmissionsByHackathonId(
      hackathonId,
      userId,
    );
  }

  @Get(':id/participants')
  @UseGuards(JwtAuthGuard)
  async getParticipantsByHackathonId(
    @Param('id') hackathonId: string,
    @Request() req: { user: { userId: string } },
  ) {
    const userId = req.user.userId;
    return this.hackathonsService.getParticipantsByHackathonId(
      hackathonId,
      userId,
    );
  }



  // @Post(':id/tags')
  // @UseGuards(JwtAuthGuard)
  // async createTags(
  //   @Param('id') hackathonId: string,
  //   @Request() req:{user:{userId:string}},
  //   @Body() tags: CreateTagDto,
  // ) {
  //   return await this.hackathonsService
  //     .validateUserHackathon(req.user.userId, hackathonId)
  //     .then((validUser) => {
  //       if (!validUser) {
  //         throw new UnauthorizedException('Not authorized for this method');
  //       }
  //       return this.hackathonsService.createTags(hackathonId, tags);
  //     });
  // }

  // @Post(':id/tabs')
  // @UseGuards(JwtAuthGuard)
  // async createTabs(
  //   @Param('id') hackathonId: string,
  //   @Body() tab: CreateTabDto,
  // ) {
  //   return await this.hackathonsService
  //     .validateUserHackathon(tab.userId, hackathonId)
  //     .then((validUser) => {
  //       if (!validUser) {
  //         throw new UnauthorizedException('Not authorized for this method');
  //       }
  //       return this.hackathonsService.createTabs(hackathonId, tab);
  //     });
  // }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ORGANIZER, RoleType.MODERATOR)
  updateAll(
    @Param('id') id: string,
    @Body() updateHackathonDto: UpdateHackathonDto,
  ) {
    return this.hackathonsService.updateHackathon(id, updateHackathonDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ORGANIZER, RoleType.ADMIN)
  delete(@Param('id') id: string) {
    return this.hackathonsService.deleteHackathon(id);
  }

  @Post(':id/register')
  @UseGuards(JwtAuthGuard)
  async registerForHackathon(
    @Param('id') hackathonId: string,
    @Request() req: { user: { userId: string } },
    @Body() userData: any,
  ) {
    return this.hackathonsService.registerParticipant(
      hackathonId,
      req.user.userId,
      userData,
    );
  }
}
