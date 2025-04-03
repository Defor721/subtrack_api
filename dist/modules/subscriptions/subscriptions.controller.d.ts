import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    subscribe(user: any, dto: CreateSubscriptionDto): Promise<{
        plan: {
            name: string;
            price: number;
            description: string;
            id: string;
            createdAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        planId: string;
        userId: string;
    }>;
    getMySubscriptions(user: any): Promise<({
        plan: {
            name: string;
            price: number;
            description: string;
            id: string;
            createdAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        planId: string;
        userId: string;
    })[]>;
}
