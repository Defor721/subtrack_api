import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser'; // 추가

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:{
      origin:['https://subtrack-front.vercel.app'],
      methods: ['POST', 'GET', 'OPTIONS'],
      credentials: true,
    }
  });

  // ✅ Stripe Webhook만 raw body 받도록 설정
  app.use('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }));

  // 전역 ValidationPipe 설정은 그대로 유지
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
