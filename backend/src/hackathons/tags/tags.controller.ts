import { Controller } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('/hackathons/:hackathonId/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
}
