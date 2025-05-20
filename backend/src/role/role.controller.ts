import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleType, User } from '@prisma/client';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService){}

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

    

}
