import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
  imports: [PrismaModule],
  exports: [RegistrationsService],
})
export class RegistrationsModule {}
