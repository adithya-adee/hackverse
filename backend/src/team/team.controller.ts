import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  Delete,
  NotFoundException,
  UnauthorizedException,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamService } from './team.service';
import { CreateTeamReqDto } from './dto/create-team-req.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { RoleType } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamsService: TeamService) { }

  @Get('count')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  getAllTeam() {
    return this.teamsService.getTeamCount();
  }

  // Create a team
  @Post()
  @UseGuards(JwtAuthGuard)
  createTeam(
    @Request() req: { user: { userId: string } },
    @Body() createTeamDto: CreateTeamDto,
  ) {
    return this.teamsService.createTeam(createTeamDto, req.user.userId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateTeam(
    @Request() req: { user: { userId: string } },
    @Body() updateTeamDto: UpdateTeamDto,
  ){
    console.log("BODY",updateTeamDto);
    const userId = req.user.userId;
    return this.teamsService.updateTeam(updateTeamDto, userId);
  }


  // Create a team request (join a team)
  @Post('team-req')
  @UseGuards(JwtAuthGuard)
  createTeamReq(
    @Body() {userId, teamId}
  ) {
    console.log("---------------body---------")
    console.log(userId,teamId);
    console.log("---------------body---------")
    return this.teamsService.createTeamReq({userId,teamId});
  }

  // Get all team requests for current user
  @Get('all-team-reqs')
  @UseGuards(JwtAuthGuard)
  getAllTeamReq(@Request() req: { user: { userId: string } }) {
    return this.teamsService.getAllTeamReq(req.user.userId);
  }

  // Check registration status
  @Get(':hackathonId/registration')
  @UseGuards(JwtAuthGuard)
  checkRegistration(
    @Request() req: { user: { userId: string } },
    @Param('hackathonId') hackathonId: string,
  ) {
    return this.teamsService.checkRegistration(req.user.userId, hackathonId);
  }

  // Get all teams
  @Get()
  getAllTeams() {
    return this.teamsService.getAllTeam();
  }

  // Create a team member (when user accepts an invite)
  @Post('create/team-member')
  @UseGuards(JwtAuthGuard)
  createTeamMember(
    @Request() req: { user: { userId: string } },
    @Body('teamId') teamId: string,
  ) {
    return this.teamsService.createTeamMember(req.user.userId, teamId);
  }

  // Get teams looking for members for a specific hackathon
  @Get('hackathon/:hackathonId/looking-for-members')
  getTeamsLookingForMembers(@Param('hackathonId') hackathonId: string) {
    return this.teamsService.getTeamsLookingForMembers(hackathonId);
  }

  // Get a specific team by ID
  @Get(':teamId')
  getTeamById(@Param('teamId') teamId: string) {
    return this.teamsService.getTeamById(teamId);
  }

  // Get all members of a team
  @Get(':teamId/members')
  getTeamMembers(@Param('teamId') teamId: string) {
    return this.teamsService.getTeamMembers(teamId);
  }

  // Get all pending requests for a team
  @Get(':teamId/requests')
  @UseGuards(JwtAuthGuard)
  getTeamRequests(
    @Request() req: { user: { userId: string } },
    @Param('teamId') teamId: string,
  ) {
    return this.teamsService.getTeamRequests(teamId, req.user.userId);
  }

  // Accept a team request
  @Post(':teamId/accept-request/:userId')
  @UseGuards(JwtAuthGuard)
  acceptTeamRequest(
    @Request() req: { user: { userId: string } },
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
  ) {
    return this.teamsService.acceptTeamRequest(teamId, userId, req.user.userId);
  }

  // Reject a team request
  @Delete(':teamId/reject-request/:userId')
  @UseGuards(JwtAuthGuard)
  rejectTeamRequest(
    @Request() req: { user: { userId: string } },
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
  ) {
    return this.teamsService.rejectTeamRequest(teamId, userId, req.user.userId);
  }


}
