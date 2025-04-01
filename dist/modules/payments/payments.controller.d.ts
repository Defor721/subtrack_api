import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createSession(user: any, body: {
        planId: string;
    }): Promise<{
        url: string | null;
    }>;
}
