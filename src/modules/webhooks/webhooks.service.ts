import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class WebhooksService {
  constructor(private prisma: PrismaService) {}

  async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const email = session.customer_email;
    const planName = session.metadata?.planId; // 👈 프론트에서 넘긴 메타데이터 활용

    if (!email || !planName) {
      console.warn('❗ 이메일 또는 요금제 정보 없음');
      return;
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    const plan = await this.prisma.plan.findUnique({ where: { id: planName } });

    if (!user || !plan) {
      console.warn('❗ 유저 또는 플랜을 찾을 수 없음');
      return;
    }

    // 중복 구독 방지
    const existing = await this.prisma.subscription.findFirst({
      where: { userId: user.id, planId: plan.id },
    });

    if (existing) {
      console.log('ℹ️ 이미 구독된 유저입니다.');
      return;
    }

    await this.prisma.subscription.create({
      data: {
        userId: user.id,
        planId: plan.id,
      },
    });

    console.log(`🎉 ${user.email} 유저의 ${plan.name} 구독 저장 완료`);
  }
}
