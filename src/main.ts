import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ 수동 CORS 응답 처리 (모든 요청 전에 실행되도록 최상단에!)
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://subtrack-front.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      console.log('✅ OPTIONS 요청 처리됨:', req.path);
      return res.sendStatus(204);
    }

    next();
  });

  // ✅ Stripe webhook만 raw로 처리 (이거 반드시 위의 미들웨어보다 아래!)
  app.use('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }));

  // ✅ 전역 ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ 요청 확인용 로그
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
