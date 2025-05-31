import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { HackathonsService } from './hackathons.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleType } from '@prisma/client';
import { Roles } from 'src/auth/decorator/role.decorator';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { CreateTagDto } from './dto/create-tags.dto';
import { CreateTabDto } from './dto/create-tabs.dto';

@Controller('hackathons')
export class HackathonsController {
  constructor(private readonly hackathonsService: HackathonsService) {}

  @Get()
  findAll() {
    return this.hackathonsService.getAllHackathons();
  }

  @Get('upcoming')
  findUpcomingHackathons() {
    console.log('upcoming');
    return this.hackathonsService.getAllUpcomingHackathons();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hackathonsService.getHackathonById(id);
  }

  //TODO: role guard jwt+role
  @Post('create')
  create(@Body() createHackathonDto: CreateHackathonDto) {
    return this.hackathonsService.createHackathon(createHackathonDto);
  }

  @Post(':id/tags')
  createTags(@Param('id') id: string, @Body() tags: CreateTagDto) {
    return this.hackathonsService.createTags(id, tags);
  }

  @Post(':id/tabs')
  createTabs(@Param('id') id: string, @Body() tab: CreateTabDto) {
    return this.hackathonsService.createTabs(id, tab);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ORGANIZER, RoleType.MODERATOR)
  updateAll(
    @Param('id') id: string,
    @Body() updateHackathonDto: UpdateHackathonDto,
  ) {
    return this.hackathonsService.updateHackathon(id, updateHackathonDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ORGANIZER, RoleType.ADMIN)
  delete(@Param('id') id: string) {
    return this.hackathonsService.deleteHackathon(id);
  }
}
