import { User } from '@prisma/client';
import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Min,
  Max,
  Length,
} from 'class-validator';

export class CreateHackathonDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  rules: string;

  @IsString()
  @IsNotEmpty()
  createdById: string;

  @IsString()
  @IsNotEmpty()
  prize: string;

  @IsInt()
  @Min(1)
  @Max(10)
  maxTeamSize: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
  
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsString()
  bannerImageUrl: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[]; //DOUBT: there is no attribute named tags

}
