import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { RoleType } from '@prisma/client';

export class CreateRoleReqDto {
  @IsEnum(RoleType)
  @IsNotEmpty()
  roleType: RoleType;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Reason must be at least 10 characters long' })
  reason: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  supportingUrl?: string;
}
