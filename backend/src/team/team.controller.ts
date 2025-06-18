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
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamService } from './team.service';
import { Roles } from 'src/common/decorator/role.decorator';
import { RoleType, Team } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamsService: TeamService) {}

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
  ) {
    const userId = req.user.userId;
    return this.teamsService.updateTeam(updateTeamDto, userId);
  }

  // Create a team request (join a team)
  @Post('team-req')
  @UseGuards(JwtAuthGuard)
  createTeamReq(@Body() { userId, teamId, isSentByTeam }) {
    return this.teamsService.createTeamReq({ userId, teamId, isSentByTeam });
  }

  // Get all team requests for current user by team
  @Get('all-team-reqs-by-team')
  @UseGuards(JwtAuthGuard)
  getAllTeamReqByTeam(@Request() req: { user: { userId: string } }) {
    return this.teamsService.getAllTeamReqbyTeam(req.user.userId);
  }

  @Get('all-team-reqs-by-user')
  @UseGuards(JwtAuthGuard)
  getAllTeamReqByUser(@Request() req: { user: { userId: string } }) {
    return this.teamsService.getAllTeamReqbyUser(req.user.userId);
  }

  //Get team details from memberID and hackathonID
  @Get('by-member-hackathon')
  @UseGuards(JwtAuthGuard)
  async getTeamByMemberAndHackathon(
    @Query('hackathonId') hackathonId: string,
    @Query('memberId') memberId: string,
  ): Promise<Team> {
    return this.teamsService.getTeamByMemberAndHackathon(memberId, hackathonId);
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
  @UseGuards(JwtAuthGuard)
  getTeamsLookingForMembers(
    @Request() req: { user: { userId: string } },
    @Param('hackathonId') hackathonId: string,
  ) {
    console.log('hittted');
    return this.teamsService.getTeamsLookingForMembers(
      hackathonId,
      req.user.userId,
    );
  }

  // Get a specific team by ID
  @Get(':teamId')
  getTeamById(@Param('teamId') teamId: string) {
    return this.teamsService.getTeamById(teamId);
  }

  @Delete(':teamId')
  @UseGuards(JwtAuthGuard)
  async deleteTeam(
    @Request() req: { user: { userId: string } },
    @Param('teamId') teamId: string,
  ) {
    return this.teamsService.deleteTeam(teamId, req.user.userId);
  }

  // Get all members of a team
  @Get(':teamId/members')
  getTeamMembers(@Param('teamId') teamId: string) {
    return this.teamsService.getTeamMembers(teamId);
  }

  // Get all pending requests for a team by a team
  @Get(':teamId/requests-by-team')
  @UseGuards(JwtAuthGuard)
  getTeamRequestsByTeam(
    @Request() req: { user: { userId: string } },
    @Param('teamId') teamId: string,
  ) {
    return this.teamsService.getTeamRequestsByTeam(teamId, req.user.userId);
  }

  // Get all pending requests for a team by participants
  @Get(':teamId/requests-by-participants')
  @UseGuards(JwtAuthGuard)
  getTeamRequestsByParticipants(
    @Request() req: { user: { userId: string } },
    @Param('teamId') teamId: string,
  ) {
    return this.teamsService.getTeamRequestsByParticipants(
      teamId,
      req.user.userId,
    );
  }

  // Accept a team request
  @Post(':teamId/accept-request-by-team/:userId')
  @UseGuards(JwtAuthGuard)
  acceptTeamRequest(
    @Request() req: { user: { userId: string } },
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
  ) {
    return this.teamsService.acceptTeamRequest(teamId, userId, req.user.userId);
  }

  @Post(':teamId/accept-request-by-part/:userId')
  @UseGuards(JwtAuthGuard)
  acceptTeamRequestbyParticipant(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
  ) {
    return this.teamsService.acceptTeamRequestbyParticipant(teamId, userId);
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

  @Get('isLeader/:teamId')
  @UseGuards(JwtAuthGuard)
  isLeader(
    @Request() req: { user: { userId: string } },
    @Param('teamId') teamId: string,
  ) {
    console.log(teamId);
    return this.teamsService.isLeader(teamId, req.user.userId);
  }
}
