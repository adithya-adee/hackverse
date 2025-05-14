import { Test, TestingModule } from '@nestjs/testing';
import { HackathonsController } from './hackathons.controller';
import { HackathonsService } from './hackathons.service';

describe('HackathonsController', () => {
  let controller: HackathonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HackathonsController],
      providers: [HackathonsService],
    }).compile();

    controller = module.get<HackathonsController>(HackathonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
