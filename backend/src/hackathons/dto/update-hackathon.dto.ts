import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateHackathonDto } from './create-hackathon.dto';
import { HackathonStatus } from '@prisma/client';

export class UpdateHackathonDto extends PartialType(CreateHackathonDto) {
  @IsOptional()
  @IsEnum(HackathonStatus)
  status?: HackathonStatus;
}
