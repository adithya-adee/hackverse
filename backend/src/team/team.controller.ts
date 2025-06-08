import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamService } from './team.service';
import { CreateTeamReqDto } from './dto/create-team-req.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { RoleType } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('team')
export class TeamController {
  constructor(private readonly teamsService: TeamService) {}

  @Get('count')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  getAllTeam() {
    return this.teamsService.getTeamCount();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createTeam(
    @Request() req: { user: { userId: string } },
    @Body() createTeamDto: CreateTeamDto,
  ) {
    return this.teamsService.createTeam(createTeamDto, req.user.userId);
  }

  //FIXME: Why is @Request used if you are not importing it in createTeamReqDto
  @Post('team-req')
  @UseGuards(JwtAuthGuard)
  createTeamReq(
    @Request() req: { user: { userId: string } },
    @Body() createTeamReqDto: CreateTeamReqDto,
  ) {
    return this.teamsService.createTeamReq(createTeamReqDto);
  }

  @Get('all-team-reqs')
  @Roles(RoleType.ORGANIZER)
  @UseGuards(JwtAuthGuard)
  getAllTeamReq(@Request() req: { user: { userId: string } }) {
    return this.teamsService.getAllTeamReq(req.user.userId);
  }

  @Get(':hackathonId/registration')
  @UseGuards(JwtAuthGuard)
  checkRegistration(
    @Request() req: { user: { userId: string } },
    @Param('hackathonId') hackathonId: string,
  ) {
    return this.teamsService.checkRegistration(req.user.userId, hackathonId);
  }

  @Post('create/team-member')
  @UseGuards(JwtAuthGuard)
  createTeamMember(
    @Request() req: { user: { userId: string } },
    @Body('teamId') teamId: string,
  ) {
    return this.teamsService.createTeamMember(req.user.userId, teamId);
  }
}
