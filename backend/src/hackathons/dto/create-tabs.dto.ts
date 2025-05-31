import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTabDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;

  @IsNotEmpty()
  @IsNumber()
  order: number;
}
