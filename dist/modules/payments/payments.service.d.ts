import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PaymentsService {
    private readonly config;
    private readonly prisma;
    private stripe;
    constructor(config: ConfigService, prisma: PrismaService);
    createCheckoutSession(userId: string, planId: string): Promise<{
        url: string | null;
    }>;
    private getUserEmail;
}
