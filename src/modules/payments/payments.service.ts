import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.stripe = new Stripe(config.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async createCheckoutSession(userId: string, planId: string) {
    const plan = await this.prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) throw new NotFoundException('요금제를 찾을 수 없습니다.');

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: await this.getUserEmail(userId),
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: plan.price * 100, // 단위: cent
            product_data: {
              name: plan.name,
              description: plan.description,
            },
          },
          quantity: 1,
        },
      ],
      success_url: this.config.get('STRIPE_SUCCESS_URL'),
      cancel_url: this.config.get('STRIPE_CANCEL_URL'),
    });

    return { url: session.url };
  }

  private async getUserEmail(userId: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return user?.email;
  }
}
