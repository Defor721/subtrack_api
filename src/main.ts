import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ 수동 CORS 응답 (Preflight OPTIONS 요청 포함)
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://subtrack-front.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }

    next();
  });

  // ✅ Stripe Webhook용 raw body parser
  app.use('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }));

  // ✅ 전역 ValidationPipe 적용
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ 요청 로깅 (선택)
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
