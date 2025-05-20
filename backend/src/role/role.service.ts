import { Injectable } from '@nestjs/common';
import { RequestStatus, RoleType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

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

  async getAllRoleReqs() {
    return await this.prisma.roleRequest.findMany({});
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

  //TODO: moderator
}
