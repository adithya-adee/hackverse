import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { RoleType } from '@prisma/client';
import { User as UserProps } from '@prisma/client';

import * as bcrypt from 'bcrypt';

interface GoogleUserProps {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<UserProps, 'password'> | null> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        return null;
      }

      if (!user.password) {
        return null;
      }
      // CRITICAL FIX: Add await to properly compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }

      return null;
    } catch (error) {
      // Log the error but don't expose details in response
      console.error('Error validating user credentials:', error);
      return null;
    }
  }

  async login(user: UserProps) {
    // Get user roles
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId: user.id },
      include: { Role: true },
    });

    const roles = userRoles.map((ur) => ur.Role.name);

    const payload = {
      sub: user.id,
      email: user.email,
      roles: roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: roles,
      },
    };
  }

  async loginWithGoogle(googleUser: GoogleUserProps) {
    const { email, firstName, lastName, picture } = googleUser;

    // 1. Check if user already exists
    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    // 2. If not, create the user
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name: `${firstName} ${lastName}`,
          profileImageUrl: picture,
          password: '', // leave empty or use a generated dummy password
        },
      });
    }

    // 3. Generate JWT
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(name: string, email: string, password: string) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the user
    const user = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log('user', user);

    // Find the PARTICIPANT role
    const participantRole = await this.prisma.role.findFirst({
      where: { name: RoleType.PARTICIPANT },
    });

    if (!participantRole) {
      throw new Error('PARTICIPANT role not found');
    }

    console.log('role:', participantRole);

    // Assign PARTICIPANT role to the new user
    await this.prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: participantRole.id,
      },
    });

    // Return user without password
    return user;
  }

  async requestRole(
    userId: string,
    roleType: RoleType,
    reason: string,
    supportingUrl?: string,
  ) {
    // Find the requested role
    const role = await this.prisma.role.findFirst({
      where: { name: roleType },
    });

    if (!role) {
      throw new Error(`Role ${roleType} not found`);
    }

    // Create the role request
    return this.prisma.roleRequest.create({
      data: {
        userId,
        roleId: role.id,
        reason,
        supportingUrl,
      },
    });
  }

  async getUserRoles(userId: string): Promise<RoleType[]> {
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { Role: true },
    });

    return userRoles.map((ur) => ur.Role.name);
  }

  async hasRole(userId: string, role: RoleType): Promise<boolean> {
    const userRoles = await this.getUserRoles(userId);
    return userRoles.includes(role);
  }
}
