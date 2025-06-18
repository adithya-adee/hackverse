import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
  const port = process.env.PORT;
  if (!process.env.CORS_ORIGIN) {
    console.log('NO');
  }
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  await app.listen(port || 3001);
}
void bootstrap();
