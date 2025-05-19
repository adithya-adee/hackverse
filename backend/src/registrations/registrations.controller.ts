import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationsService.create(
      createRegistrationDto.userId,
      createRegistrationDto.hackathonId,
    );
  }

  @Get('user/:userId')
  findUserRegistrations(@Param('userId') userId: string) {
    return this.registrationsService.getRegisteredHackathons(userId);
  }

  @Delete(':userId/:hackathonId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('userId') userId: string,
    @Param('hackathonId') hackathonId: string,
  ) {
    return this.registrationsService.remove(userId, hackathonId);
  }
}
