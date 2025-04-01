import { ConfigService } from '@nestjs/config';
export declare class WebhooksController {
    private config;
    private stripe;
    constructor(config: ConfigService);
    handleStripeWebhook(req: any, sig: string): Promise<{
        received: boolean;
    }>;
}
