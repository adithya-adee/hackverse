import {
  Controller,
  Get,
  Body,
  Request,
  Param,
  Patch,
  Delete,
  UseGuards,
  BadRequestException,
  UnauthorizedException,
  Query,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';

import { RoleType, Skill } from '@prisma/client';
import { Roles } from 'src/auth/decorator/role.decorator';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.RECRUITER)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('isRegistered')
    @UseGuards(JwtAuthGuard)
    async checkRegistration(
      @Query('email') memberEmail: string
    ) {
      try {
        const user = await this.usersService.findOneByEmail(memberEmail);
        return { isRegistered: true, user:user };
      } catch (error) {
        if (error instanceof NotFoundException) {
          return { isRegistered: false, user:null };
        }
      throw error;
    }
  }

  // Get currently logged in user profile
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: { user: { userId: string } }) {
    return this.usersService.findOne(req.user.userId);
  }


  @Get('/profile/hackathons')
  async getHackathons(@Request() req: { user: { userId: string } }) {
    return this.usersService.getHackathonsByOrganizer(req.user.userId);
  }

  @Get('/profile/teams')
  async getTeams(@Request() req: { user: { userId: string } }) {
    return this.usersService.getTeamsByOrganizer(req.user.userId);
  }

  @Get('/profile/submissions')
  async getSubmissions(@Request() req: { user: { userId: string } }) {
    return this.usersService.getSubmissionsByOrganizer(req.user.userId);
  }

  // Get a specific user - when fetching other user
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }



  @Patch(':id/profile')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req: { user: { userId: string; roles: RoleType[] }},
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log("----------------------------body------------------------------");
    console.log(updateUserDto);
    console.log("----------------------------body------------------------------");

    const isAdmin = req.user.roles.includes(RoleType.ADMIN);
    const isSelf = req.user.userId === userId;

    if (!isAdmin && !isSelf) {
      throw new UnauthorizedException('You can only update your own profile');
    }

    return this.usersService.update(userId, updateUserDto);
  }

  @Patch(':id/skills')
  @UseGuards(JwtAuthGuard)
  async updateSkills(
    @Request() req: { user: { userId: string } },
    @Param('userId') userId: string,
    @Body() updateSkillsDto: { skills: string[] },
  ) {
    if (req.user.userId !== userId) {
      throw new UnauthorizedException('Only user can modify his skills');
    }

    const { skills } = updateSkillsDto;

    if (!Array.isArray(skills)) {
      throw new BadRequestException('Skills must be an array of strings');
    }

    return this.usersService.updateSkills(req.user.userId, skills);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // Add these endpoints to your UsersController

  @Get('organizer/hackathons')
  @UseGuards(JwtAuthGuard)
  async getOrganizerHackathons(@Request() req) {
    return this.usersService.getHackathonsByOrganizer(req.user.userId);
  }

  @Get('organizer/teams')
  @UseGuards(JwtAuthGuard)
  async getOrganizerTeams(@Request() req) {
    return this.usersService.getTeamsByOrganizer(req.user.userId);
  }

  @Get('organizer/submissions')
  @UseGuards(JwtAuthGuard)
  async getOrganizerSubmissions(@Request() req) {
    return this.usersService.getSubmissionsByOrganizer(req.user.userId);
  }

  @Get('organizer/participants')
  @UseGuards(JwtAuthGuard)
  async getParticipantsByOrganizer(
    @Request() req: { user: { userId: string } },
  ) {
    return this.usersService.getParticipantsByOrganizer(req.user.userId);
  }
}
