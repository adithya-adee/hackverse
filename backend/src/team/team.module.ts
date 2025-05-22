import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [PrismaModule],
  exports: [TeamService],
})
export class TeamModule {}
