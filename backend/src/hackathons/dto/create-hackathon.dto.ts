import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Min,
  Max,
  Length,
  IsUrl,
  IsEnum,
  ValidateIf,
  IsArray,
} from 'class-validator';

import { HackathonMode } from '@prisma/client';

export class CreateHackathonDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @ValidateIf(
    (o: CreateHackathonDto) => o.mode === 'OFFLINE' || o.mode === 'HYBRID',
  )
  location?: string;

  @IsNotEmpty()
  @IsEnum(HackathonMode)
  mode: HackathonMode;

  @IsInt()
  @Min(1)
  @Max(10)
  maxTeamSize: number;

  @IsDateString()
  @IsNotEmpty()
  registrationDate: Date;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsOptional()
  @IsUrl()
  bannerImageUrl?: string;

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsOptional()
  @IsArray()
  tabs: {
    title: string;
    content: string;
    order: number;
    isVisible: boolean;
  }[];
}
