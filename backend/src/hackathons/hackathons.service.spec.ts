import { Test, TestingModule } from '@nestjs/testing';
import { HackathonsService } from './hackathons.service';

describe('HackathonsService', () => {
  let service: HackathonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HackathonsService],
    }).compile();

    service = module.get<HackathonsService>(HackathonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
