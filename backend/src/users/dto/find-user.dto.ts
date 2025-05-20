import { IsOptional, IsString, IsDate, IsEmail } from 'class-validator';

export class FindUserDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  biography?: string | null;

  @IsOptional()
  @IsString()
  profileImageUrl?: string | null;

  @IsOptional()
  @IsString()
  resumeUrl?: string | null;

  @IsOptional()
  @IsString()
  githubUrl?: string | null;

  @IsOptional()
  @IsString()
  linkedinUrl?: string | null;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
