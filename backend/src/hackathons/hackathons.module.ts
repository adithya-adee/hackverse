import { Module } from '@nestjs/common';
import { HackathonsService } from './hackathons.service';
import { HackathonsController } from './hackathons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TabsModule } from './tabs/tabs.module';
import { TabsController } from './tabs/tabs.controller';
import { TabsService } from './tabs/tabs.service';
import { TagsModule } from './tags/tags.module';
import { TagsController } from './tags/tags.controller';
import { TagsService } from './tags/tags.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') ?? '1d',
        },
      }),
    }),
    TabsModule,
    TagsModule,
  ],
  controllers: [HackathonsController, TabsController, TagsController],
  providers: [HackathonsService, TabsService, TagsService],
  exports: [HackathonsService],
})
export class HackathonsModule {}
