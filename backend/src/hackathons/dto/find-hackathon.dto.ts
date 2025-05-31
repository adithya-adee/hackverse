import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsUrl,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateHackathonDto } from './create-hackathon.dto';
import { HackathonStatus, HackathonMode } from '@prisma/client';

class CreatorDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  profileImageUrl?: string;
}

class TabDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class FindHackathonDto extends PartialType(CreateHackathonDto) {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsEnum(HackathonStatus)
  status?: HackathonStatus;

  @IsOptional()
  @IsEnum(HackathonMode)
  mode?: 'ONLINE' | 'OFFLINE' | 'HYBRID';

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatorDto)
  createdBy?: CreatorDto;

  @IsOptional()
  @IsNumber()
  registeredParticipants?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TabDto)
  tabs?: TabDto[];

  @IsOptional()
  @IsDate()
  createdAt: Date;
}
