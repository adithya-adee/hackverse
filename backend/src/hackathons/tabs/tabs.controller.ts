import { Controller } from '@nestjs/common';
import { TabsService } from './tabs.service';

@Controller('/hackathons/:hackathonId/tabs')
export class TabsController {
  constructor(private readonly tabsService: TabsService) {}
}
