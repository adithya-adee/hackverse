import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RequestStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleReqDto } from './dto/createRoleReq-dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async requestRole(id: string, createRoleReqDto: CreateRoleReqDto) {
    const { roleType, reason, supportingUrl } = createRoleReqDto;

    console.log(id);
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    // Find the requested role
    const role = await this.prisma.role.findFirst({
      where: { name: roleType },
    });

    if (!role) {
      throw new NotFoundException(`Role ${roleType} not found`);
    }

    // Check if the user already has a pending request for this role
    const existingRequest = await this.prisma.roleRequest.findFirst({
      where: {
        userId: id,
        roleId: role.id,
        status: 'PENDING',
      },
    });

    if (existingRequest) {
      throw new BadRequestException(
        'You already have a pending request for this role',
      );
    }

    // Create the role request using proper Prisma syntax
    try {
      return await this.prisma.roleRequest.create({
        data: {
          userId: id,
          reason,
          supportingUrl,
          status: 'PENDING',
          roleId: role.id, // This works because we have defined the relation in schema
        },
        include: {
          Role: true,
          User: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error creating role request:', error);
      throw new BadRequestException(
        'Failed to create role request. Please try again.',
      );
    }
  }

  async getAllRoleReqs() {
    return await this.prisma.roleRequest.findMany({
      select: {
        id: true,
        reason: true,
        supportingUrl: true,
        status: true,
        createdAt: true,
        User: {
          select: {
            name: true,
            email: true,
          },
        },
        Role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async updateRole(
    roleRequestId: string,
    status: RequestStatus,
    reviewNotes: string,
  ) {
    const roleReq = await this.prisma.roleRequest.findUnique({
      where: { id: roleRequestId },
    });

    if (!roleReq) {
      throw new Error('Role Request not found!');
    }

    await this.prisma.roleRequest.update({
      where: { id: roleRequestId },
      data: {
        status,
        reviewNotes,
      },
    });

    if (status === 'APPROVED') {
      const userRoles = await this.prisma.userRole.findMany({
        where: {
          userId: roleReq.userId,
        },
        include: {
          Role: true,
        },
      });

      // Find the participant role in the system
      const participantRole = await this.prisma.role.findFirst({
        where: { name: 'PARTICIPANT' },
      });

      if (!participantRole) {
        throw new Error('Default PARTICIPANT role not found in system!');
      }

      // Delete the participant role if the user is getting a new role
      if (roleReq.roleId !== participantRole.id) {
        const participantUserRole = userRoles.find(
          (userRole) => userRole.Role.name === 'PARTICIPANT',
        );

        if (participantUserRole) {
          await this.prisma.userRole.delete({
            where: {
              userId_roleId: {
                userId: roleReq.userId,
                roleId: participantUserRole.roleId,
              },
            },
          });
        }
      }

      // Create the new role assignment
      await this.prisma.userRole.upsert({
        where: {
          userId_roleId: {
            userId: roleReq.userId,
            roleId: roleReq.roleId,
          },
        },
        update: {
          updatedAt: new Date(),
        },
        create: {
          userId: roleReq.userId,
          roleId: roleReq.roleId,
        },
      });
    }

    return { message: 'Role request processed.' };
  }

  async acceptRoleRequest(requestId: string) {
    return await this.prisma.$transaction(async (prisma) => {
      // 1. Get the role request
      const roleRequest = await prisma.roleRequest.findUnique({
        where: { id: requestId },
        include: {
          Role: true,
        },
      });

      if (!roleRequest) {
        throw new NotFoundException('Role request not found');
      }

      // 2. Check if user already has a role
      const existingUserRole = await prisma.userRole.findFirst({
        where: {
          userId: roleRequest.userId,
          roleId: roleRequest.roleId,
        },
      });

      if (existingUserRole) {
        throw new BadRequestException('User already has this role');
      }

      // 3. Create new UserRole
      const newUserRole = await prisma.userRole.create({
        data: {
          userId: roleRequest.userId,
          roleId: roleRequest.roleId,
        },
      });

      // 4. Update role request status
      await prisma.roleRequest.update({
        where: { id: requestId },
        data: {
          status: 'APPROVED',
          updatedAt: new Date(),
        },
      });

      return newUserRole;
    });
  }

  async rejectRoleRequest(requestId: string) {
    const roleRequest = await this.prisma.roleRequest.findUnique({
      where: { id: requestId },
    });

    if (!roleRequest) {
      throw new NotFoundException('Role request not found');
    }

    return await this.prisma.roleRequest.update({
      where: { id: requestId },
      data: {
        status: 'REJECTED',
        updatedAt: new Date(),
      },
    });
  }

  async updateRoleRequestNotes(requestId: string, notes: string) {
    const roleRequest = await this.prisma.roleRequest.findUnique({
      where: { id: requestId },
    });

    if (!roleRequest) {
      throw new NotFoundException('Role request not found');
    }

    return await this.prisma.roleRequest.update({
      where: { id: requestId },
      data: {
        reviewNotes: notes,
        updatedAt: new Date(),
      },
    });
  }
}
