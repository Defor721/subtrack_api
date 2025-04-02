import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
export declare class WebhooksService {
    private prisma;
    constructor(prisma: PrismaService);
    handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void>;
}
