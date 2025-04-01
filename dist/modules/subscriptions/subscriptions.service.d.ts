import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateSubscriptionDto): Promise<{
        id: string;
        createdAt: Date;
        planId: string;
        userId: string;
    }>;
    findMySubscriptions(userId: string): Promise<({
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
