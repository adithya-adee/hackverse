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

  // //TODO: role guard jwt+role
  @Post('create')
  create(@Body() createHackathonDto: CreateHackathonDto) {
    return this.hackathonsService.createHackathon(createHackathonDto);
  }

  // @Patch(':id/create/tabs')
  // async updateTags(
  //   @Param('id') hackathonId: string,
  //   @Body() body: { hackathonTags: HackathonTag; userId: string },
  // ) {
  //   return await this.hackathonsService
  //     .validateUserHackathon(body.userId, hackathonId)
  //     .then((isOrganizer) => {
  //       if (!isOrganizer) {
  //         throw new UnauthorizedException(
  //           'Not authorized to perform this action',
  //         );
  //       }
  //       return this.hackathonsService.updateHackathonTags(body.hackathonTags);
  //     });
  // }

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
