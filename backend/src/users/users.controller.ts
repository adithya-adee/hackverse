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

  // Get currently logged in user profile
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: { user: { userId: string } }) {
    return this.usersService.findOne(req.user.userId);
  }

  // Get a specific user - when fetching other user
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req: { user: { userId: string; roles: RoleType[] } },
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isAdmin = req.user.roles.includes(RoleType.ADMIN);
    const isSelf = req.user.userId === userId;

    if (!isAdmin && isSelf) {
      throw new Error('You can only update your own profile');
    }

    console.log(updateUserDto);

    return this.usersService.update(req.user.userId, updateUserDto);
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
}
