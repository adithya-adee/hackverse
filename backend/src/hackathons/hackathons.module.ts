import { Module } from '@nestjs/common';
import { HackathonsService } from './hackathons.service';
import { HackathonsController } from './hackathons.controller';

@Module({
  controllers: [HackathonsController],
  providers: [HackathonsService],
})
export class HackathonsModule {}
