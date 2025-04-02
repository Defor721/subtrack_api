import { ConfigService } from '@nestjs/config';
import { WebhooksService } from './webhooks.service';
export declare class WebhooksController {
    private config;
    private webhooksService;
    private stripe;
    constructor(config: ConfigService, webhooksService: WebhooksService);
    handleStripeWebhook(req: any, sig: string): Promise<{
        received: boolean;
    }>;
}
