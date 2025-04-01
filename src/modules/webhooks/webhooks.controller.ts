import {
    Controller,
    Post,
    Req,
    Headers,
    BadRequestException,
  } from '@nestjs/common';
  import Stripe from 'stripe';
  import { ConfigService } from '@nestjs/config';
  
  @Controller('webhooks')
  export class WebhooksController {
    private stripe: Stripe;
  
    constructor(private config: ConfigService) {
      this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY') as string)
    }
  
    @Post('stripe')
    async handleStripeWebhook(
      @Req() req: any,
      @Headers('stripe-signature') sig: string,
    ) {
      let event: Stripe.Event;
  
      try {
        event = this.stripe.webhooks.constructEvent(
          req.body, // 🔥 raw body
          sig,
          this.config.get('STRIPE_WEBHOOK_SECRET') as string,
        );
      } catch (err: any) {
        console.error('❌ Webhook signature verification failed:', err.message);
        throw new BadRequestException(`Webhook Error: ${err.message}`);
      }
  
      console.log('✅ Stripe Webhook Event:', event.type);
  
      // 예시: 결제 완료 시
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('🎉 Payment succeeded for:', session.customer_email);
      }
  
      return { received: true };
    }
  }
  