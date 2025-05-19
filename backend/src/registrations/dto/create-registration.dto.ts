import { IsString } from 'class-validator';

export class CreateRegistrationDto {
  @IsString()
  userId: string;

  @IsString()
  hackathonId: string;
}
