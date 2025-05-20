import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleType, User } from '@prisma/client';
import { get } from 'http';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('request-role')
  @UseGuards(JwtAuthGuard)
  async requestRole(
    @Request() req: { user: User },
    @Body()
    requestDto: {
      roleType: RoleType;
      reason: string;
      supportingUrl?: string;
    },
  ) {
    return this.roleService.requestRole(
      req.user.id,
      requestDto.roleType,
      requestDto.reason,
      requestDto.supportingUrl,
    );
  }

  @Get('getAllReqs')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(RoleType.ADMIN)
  async getAllRoleReqs(){
    return this.roleService.getAllRoleReqs();
  }

  // @Patch('')
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(RoleType.ADMIN)
  // async updateRole(
  //   @Body() 
  // ){
  //   return this.roleService.updateRole()
  // }


}
