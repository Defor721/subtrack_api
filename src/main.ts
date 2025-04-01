import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['https://subtrack-front.vercel.app'], // 🔥 프론트 주소 정확히 명시
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
    },
  });

  // Stripe Webhook용 raw body 파서
  app.use('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }));

  // ValidationPipe 전역 적용
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
