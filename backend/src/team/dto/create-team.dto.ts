import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  hackathonId: string;

  @IsBoolean()
  lookingForMembers: boolean;

  @IsOptional()
  @IsString()
  requiredSkills: string;
}
