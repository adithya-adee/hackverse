import { Module } from '@nestjs/common';
import { HackathonsModule } from './hackathons/hackathons.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { TeamModule } from './team/team.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    UsersModule,
    HackathonsModule,
    PrismaModule,
    AuthModule,
    RegistrationsModule,
    TeamModule,
    RoleModule,
  ],
})
export class AppModule {}
