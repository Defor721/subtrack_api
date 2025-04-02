"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    config;
    prisma;
    stripe;
    constructor(config, prisma) {
        this.config = config;
        this.prisma = prisma;
        this.stripe = new stripe_1.default(config.get('STRIPE_SECRET_KEY'));
    }
    async createCheckoutSession(userId, planId) {
        const plan = await this.prisma.plan.findUnique({ where: { id: planId } });
        if (!plan)
            throw new common_1.NotFoundException('요금제를 찾을 수 없습니다.');
        const session = await this.stripe.checkout.sessions.create({
            mode: 'payment',
            customer_email: await this.getUserEmail(userId),
            metadata: {
                planId,
            },
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: plan.price * 100,
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
    async getUserEmail(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.email) {
            throw new Error('유저 또는 이메일이 존재하지 않습니다.');
        }
        return user.email;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map