import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

import { User } from '@prisma/client';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash password before creating user
    if (createUserDto.password) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<FindUserDto[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        biography: true,
        profileImageUrl: true,
        resumeUrl: true,
        githubUrl: true,
        linkedinUrl: true,
        createdAt: true,
        updatedAt: true,
        UserRole: {
          include: {
            Role: true,
          },
        },
        Skill: true,
      },
    });
  }

  async findOne(id: string): Promise<FindUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        biography: true,
        profileImageUrl: true,
        resumeUrl: true,
        githubUrl: true,
        linkedinUrl: true,
        createdAt: true,
        updatedAt: true,
        UserRole: {
          include: {
            Role: true,
          },
        },
        Skill: true,
        // Only for recruiters and admins
        Hackathon: true,
        TeamMember: {
          include: {
            Team: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  //TODO: make a controller for this - will use during team finding (leader will enter email to find teammates)
  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    const updateUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!updateUser) {
      throw new NotFoundException('User not found');
    }
    // Convert password: null to password: undefined for UpdateUserDto compatibility
    const { password, ...rest } = updateUser;
    return {
      ...rest,
      password: password === null ? undefined : password,
    } as UpdateUserDto;
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  //TODO: don't know how to deal with this
  async updateSkills(userId: string, skillIds: string[]) {
    // First disconnect all existing skills
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        Skill: {
          set: [],
        },
      },
    });

    // Then connect the new skills
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        Skill: {
          connect: skillIds.map((id) => ({ id })),
        },
      },
    });
  }

  async getUserRoles(userId: string) {
    const userWithRoles = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        UserRole: {
          include: {
            Role: true,
          },
        },
      },
    });

    return userWithRoles?.UserRole.map((ur) => ur.Role) || [];
  }
}
