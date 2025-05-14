import { Controller } from '@nestjs/common';
import { HackathonsService } from './hackathons.service';

@Controller('hackathons')
export class HackathonsController {
  constructor(private readonly hackathonsService: HackathonsService) {}
}
