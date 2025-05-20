import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

interface UserPayload {
  userId: string;
  email: string;
  roles: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {

    console.log("1111111")
    const jwtSecret = configService.getOrThrow<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new UnauthorizedException('JWT_SECRET must be defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserPayload> {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    try {
      
      const roles = await this.authService.getUserRoles(payload.sub);

      return {
        userId: payload.sub,
        email: payload.email,
        roles,
      };
    } catch (error: any) {
      console.error('Validation error:', error);
      throw new UnauthorizedException('Failed to validate token');
    }
  }
}
