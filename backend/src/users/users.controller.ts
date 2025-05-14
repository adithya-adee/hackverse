import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/interfaces/user.interface';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUserById(id);
  }
}
