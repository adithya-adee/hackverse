import { Module } from '@nestjs/common';
import { HackathonsService } from './hackathons.service';
import { HackathonsController } from './hackathons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [HackathonsController],
  providers: [HackathonsService],
  imports: [PrismaModule],
  exports: [HackathonsService],
})
export class HackathonsModule {}
