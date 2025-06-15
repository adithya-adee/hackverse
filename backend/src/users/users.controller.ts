import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
  Request,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RoleType } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.RECRUITER)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('isRegistered')
  @UseGuards(JwtAuthGuard)
  async checkRegistration(@Query('email') memberEmail: string) {
    try {
      const user = await this.usersService.findOneByEmail(memberEmail);
      return { isRegistered: true, user: user };
    } catch (error) {
      return new NotFoundException('Registered false', error);
    }
  }

  // Get currently logged in user profile
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: { user: { userId: string } }) {
    return this.usersService.findOne(req.user.userId);
  }

  // ============= ORGANIZER ENDPOINTS =================

  @Get('organizer/hackathons')
  @UseGuards(JwtAuthGuard)
  async getHackathonsByOrganizer(@Request() req: { user: { userId: string } }) {
    return this.usersService.getHackathonsByOrganizer(req.user.userId);
  }

  @Get('organizer/teams')
  @UseGuards(JwtAuthGuard)
  async getTeamsByOrganizer(@Request() req: { user: { userId: string } }) {
    return this.usersService.getTeamsByOrganizer(req.user.userId);
  }

  @Get('organizer/submissions')
  @UseGuards(JwtAuthGuard)
  async getSubmissionsByOrganizer(
    @Request() req: { user: { userId: string } },
  ) {
    return this.usersService.getSubmissionsByOrganizer(req.user.userId);
  }

  @Get('organizer/participants')
  @UseGuards(JwtAuthGuard)
  async getParticipantsByOrganizer(
    @Request() req: { user: { userId: string } },
  ) {
    return this.usersService.getParticipantsByOrganizer(req.user.userId);
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
    @Request() req: { user: { userId: string; roles: RoleType[] } },
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(
      '----------------------------body------------------------------',
    );
    console.log(updateUserDto);
    console.log(
      '----------------------------body------------------------------',
    );

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
    @Param('id') userId: string,
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

  @Delete(':userId/skills/:skillId')
  @UseGuards(JwtAuthGuard)
  async deleteUserSkill(
    @Request() req: { user: { userId: string } },
    @Param('userId') userId: string,
    @Param('skillId') skillId: string,
  ) {
    if (req.user.userId !== userId) {
      throw new UnauthorizedException('Only user can modify their skills');
    }
    return this.usersService.deleteUserSkill(userId, skillId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
