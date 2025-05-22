import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @IsNotEmpty()
  // @MinLength(6)
  // password: string;

  // Password is optional if coming from Google (i.e., if not a local signup)
  @ValidateIf((o: CreateUserDto) => o.strategy !== 'google')
  @IsNotEmpty({ message: 'Password is required for local signups' })
  password?: string;

  // Optional helper field to detect strategy type
  @IsOptional()
  strategy?: 'local' | 'google';

  @IsOptional()
  @IsString()
  biography?: string;

  @IsOptional()
  @IsUrl()
  profileImageUrl?: string;

  @IsOptional()
  @IsUrl()
  resumeUrl?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;
}
