import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleType } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Get currently logged in user profile
  @Get('profile')
  getProfile(@Request() req: { user: { userId: string } }) {
    return this.usersService.findOne(req.user.userId);
  }

  // Get a specific user - requires authentication
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Request() req: { user: { userId: string; roles: RoleType[] } },
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Check if user is updating their own profile or is an admin
    const isAdmin = req.user.roles.includes(RoleType.ADMIN);
    const isSelf = req.user.userId === id;

    if (!isAdmin && !isSelf) {
      throw new Error('You can only update your own profile');
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id/skills') // Changed from @Patch(':id')
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
