import { Injectable, Param } from '@nestjs/common';

import { users } from 'generated/prisma';
import prisma from 'utils/prisma';

@Injectable()
export class UsersService {
  async getAllUsers(): Promise<users[]> {
    const response = await prisma.users.findMany({});
    return response;
  }

  async getUserById(@Param('id') id: string): Promise<users> {
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
