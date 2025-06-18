import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { RegistrationsService } from './registrations.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateRegistrationDto } from './dto/create-registration.dto';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard) //only logged in user can register for hackathon
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationsService.create(
      createRegistrationDto.userId,
      createRegistrationDto.hackathonId,
    );
  }



  @Get('submission')
  getSubmissionCount() {
    return this.registrationsService.getSubmissionCount();
  }

  //Registrations for a perticular user
  @Get('user/:userId')
  findUserRegistrations(@Param('userId') userId: string) {
    return this.registrationsService.getRegisteredHackathons(userId);
  }

  // Check registration status for current user
  @Get('check/:hackathonId')
  @UseGuards(JwtAuthGuard)
  checkRegistration(
    @Request() req: { user: { userId: string } },
    @Param('hackathonId') hackathonId: string,
    ) {
    console.log("registercheck")
    console.log(hackathonId)
    return this.registrationsService.checkRegistration(req.user.userId, hackathonId);
  }


  //fetch all the users registered for a perticular hackathon
  @Get('all/:hackathonId')
  @UseGuards(JwtAuthGuard)
  async getAllRegisterUsers(
    @Request() req: { user: { userId: string } },
    @Param('hackathonId') hackathonId: string,
  ){
    const isRegistered = await this.registrationsService.checkRegistration(req.user.userId,hackathonId);
    if(!isRegistered){
      throw new NotFoundException('Registration not found');
    }
    return this.registrationsService.getAllRegistered(hackathonId,req.user.userId);
  }

  @Delete(':userId/:hackathonId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('userId') userId: string,
    @Param('hackathonId') hackathonId: string,
  ) {
    return this.registrationsService.remove(userId, hackathonId);
  }

  //TODO: get req to check wheather user is registered in hackathon (can be avoided)
}
