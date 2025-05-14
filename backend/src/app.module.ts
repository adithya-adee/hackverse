import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HackathonsModule } from './hackathons/hackathons.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, HackathonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
