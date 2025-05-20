import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(private readonly teamsService: TeamService) {}
    
    @Post()
    @UseGuards(JwtAuthGuard)
    createTeam(
        @Request() req: { user: { userId: string } },
        @Body() createTeamDto: Omit<CreateTeamDto, 'createdById'>,
    ) 
    {
        return this.teamsService.createTeam(createTeamDto, req.user.userId);
    }




}
