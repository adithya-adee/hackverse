import { Injectable, Param } from '@nestjs/common';

import { User } from 'src/interfaces/user.interface';
import prisma from 'utils/prisma';

@Injectable()
export class UsersService {
  async getAllUsers(): Promise<User[]> {
    const response = await prisma.users.findMany({});
    return response;
  }

  async getUserById(@Param('id') id: string): Promise<User> {
    if (!id) {
      throw new Error('Id is required to fetch details');
    }
    const response = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    if (!response) {
      throw new Error(`User with id ${id} not found`);
    }
    return response;
  }
}
