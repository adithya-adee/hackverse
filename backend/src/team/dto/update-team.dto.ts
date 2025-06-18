import { PartialType } from "@nestjs/mapped-types";
import { CreateTeamDto } from "./create-team.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTeamDto extends PartialType(CreateTeamDto){
    @IsNotEmpty()
    @IsString()
    teamId: string;
}