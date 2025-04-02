import { Controller, Post, Req, Headers, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { WebhooksService } from './webhooks.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('webhooks')
export class WebhooksController {
  private stripe: Stripe;

  constructor(
    private config: ConfigService,
    private webhooksService: WebhooksService,
  ) {
    this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY') as string);
  }

  @Public()
  @Post('stripe')
  async handleStripeWebhook(
    @Req() req: any,
    @Headers('stripe-signature') sig: string,
  ) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        sig,
        this.config.get('STRIPE_WEBHOOK_SECRET') as string,
      );
    } catch (err: any) {
      console.error('❌ Webhook signature verification failed:', err.message);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    console.log('✅ Stripe Webhook Event:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // 💾 구독 저장 로직 호출
      await this.webhooksService.handleCheckoutCompleted(session);
    }

    return { received: true };
  }
}
