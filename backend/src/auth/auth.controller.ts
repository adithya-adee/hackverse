import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { RoleType, User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorator/role.decorator';
import { RolesGuard } from './guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: User }): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Set strategy if not provided
    createUserDto.strategy = createUserDto.strategy || 'local';
    return this.authService.register(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password as string,
    );
  }

  // @Post('request-role')
  // @UseGuards(JwtAuthGuard)
  // async requestRole(
  //   @Request() req: { user: User },
  //   @Body()
  //   requestDto: {
  //     roleType: RoleType;
  //     reason: string;
  //     supportingUrl?: string;
  //   },
  // ) {
  //   return this.authService.requestRole(
  //     req.user.id,
  //     requestDto.roleType,
  //     requestDto.reason,
  //     requestDto.supportingUrl,
  //   );
  // }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: { user: User }) {
    return req.user;
  }

  // Step 1: Redirect to Google OAuth
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    //handeled by guard
  }

  // Step 2: Google OAuth Callback
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: { user: User }, @Res() res: Response) {
    const googleUser = {
      email: req.user.email,
      firstName: req.user.name.split(' ')[0],
      lastName: req.user.name.split(' ')[1] || '',
      picture: req.user.profileImageUrl || '',
    };
    const token = await this.authService.loginWithGoogle(googleUser);
    return res.redirect(
      `http://localhost:3000/auth/callback?token=${token.access_token}`, //TODO: change this when writing frontend..
    );
  }

  //this will redirect to a frontend url where we'll extract the token and store it in localstorage or cookie and then redirect to something like dashboard

  @Get('admin-only')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  adminOnly() {
    //TODO : Admin point
    return { message: 'This is an admin only endpoint' };
  }
}
