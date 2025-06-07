import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestStatus, RoleType } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { CreateRoleReqDto } from './dto/createRoleReq-dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('request-role')
  @UseGuards(JwtAuthGuard)
  async requestRole(
    @Request() req: { user: { userId: string } },
    @Body() createRoleReqDto: CreateRoleReqDto,
  ) {
    console.log(req.user, createRoleReqDto);
    return this.roleService.requestRole(req.user.userId, createRoleReqDto);
  }

  @Get('getAllReqs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async getAllRoleReqs() {
    return this.roleService.getAllRoleReqs();
  }

  @Patch('update-request/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async updateRole(
    @Param('id') id: string,
    @Body() updateData: { status: RequestStatus; reviewNotes?: string },
  ) {
    return this.roleService.updateRole(
      id,
      updateData.status,
      updateData.reviewNotes || '',
    );
  }
}
