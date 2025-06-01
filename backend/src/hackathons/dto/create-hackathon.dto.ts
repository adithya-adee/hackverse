import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Min,
  Max,
  Length,
  IsArray,
  IsUrl,
  IsEnum,
} from 'class-validator';

import { HackathonMode } from '@prisma/client';
export class CreateHackathonDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  title: string;

  @IsString()
  @IsNotEmpty()
  createdById: string;

  @IsInt()
  @Min(1)
  @Max(10)
  maxTeamSize: number;

  @IsNotEmpty()
  @IsEnum(HackathonMode)
  mode: HackathonMode;

  @IsDateString()
  @IsNotEmpty()
  registrationDate: Date;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsOptional()
  @IsUrl()
  bannerImageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
