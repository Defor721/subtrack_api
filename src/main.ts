import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS 수동 처리
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://subtrack-front.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      console.log('✅ OPTIONS 응답 완료:', req.url);
      return res.sendStatus(204);
    }

    next();
  });

  // ❌ Stripe Webhook용 raw body parser 제거 (임시)
  // app.use('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }));

  // ✅ 전역 ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ 요청 로그 확인용
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
