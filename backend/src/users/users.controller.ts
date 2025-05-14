import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { users } from 'generated/prisma';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<users[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<users> {
    return await this.usersService.getUserById(id);
  }
}
