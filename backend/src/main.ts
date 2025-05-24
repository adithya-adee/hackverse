import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // Your frontend URL
    credentials: true,
  });


  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
