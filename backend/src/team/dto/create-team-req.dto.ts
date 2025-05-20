import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeamReqDto {
    @IsString()
    @IsNotEmpty()
    teamId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}