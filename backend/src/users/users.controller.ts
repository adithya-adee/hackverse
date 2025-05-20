import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { RoleType } from '@prisma/client';
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
    console.log("hitted")
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
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Check if user is updating their own profile or is an admin
    const isAdmin = req.user.roles.includes(RoleType.ADMIN);
    const isSelf = req.user.userId === id;

    console.log("req--->",req.user)
    if (!isAdmin && !isSelf) {
      throw new Error('You can only update your own profile');
    }

    console.log("update 1 hit:", updateUserDto)
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id/skills')
  @UseGuards(JwtAuthGuard)
  async updateSkills(
    @Request() req: { user: { userId: string; roles: RoleType[] } },
    @Param('id') id: string,
    @Body() data: { skillIds: string[] },
  ) {
    const isAdmin = req.user.roles.includes(RoleType.ADMIN);
    const isSelf = req.user.userId === id;

    if (!isAdmin && !isSelf) {
      throw new Error('You can only update your own skills');
    }
    return this.usersService.updateSkills(id, data.skillIds);
  }
}
