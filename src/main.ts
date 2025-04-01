import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ 정식 CORS 설정 (enableCors 사용)
  app.enableCors({
    origin: ['https://subtrack-front.vercel.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  });

  // ✅ Stripe Webhook 경로에만 raw body parser 적용
  app.use('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }));

  // ✅ 응급 프리플라이트 처리 (Nest에서 CORS 작동 안 할 경우 대비)
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', 'https://subtrack-front.vercel.app');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      return res.sendStatus(204);
    }
    next();
  });

  // ✅ 요청 확인용 로그
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });

  // ✅ 전역 Validation Pipe
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
