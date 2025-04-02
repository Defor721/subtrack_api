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
exports.WebhooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let WebhooksService = class WebhooksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleCheckoutCompleted(session) {
        const email = session.customer_email;
        const planName = session.metadata?.planId;
        if (!email || !planName) {
            console.warn('❗ 이메일 또는 요금제 정보 없음');
            return;
        }
        const user = await this.prisma.user.findUnique({ where: { email } });
        const plan = await this.prisma.plan.findUnique({ where: { id: planName } });
        if (!user || !plan) {
            console.warn('❗ 유저 또는 플랜을 찾을 수 없음');
            return;
        }
        const existing = await this.prisma.subscription.findFirst({
            where: { userId: user.id, planId: plan.id },
        });
        if (existing) {
            console.log('ℹ️ 이미 구독된 유저입니다.');
            return;
        }
        await this.prisma.subscription.create({
            data: {
                userId: user.id,
                planId: plan.id,
            },
        });
        console.log(`🎉 ${user.email} 유저의 ${plan.name} 구독 저장 완료`);
    }
};
exports.WebhooksService = WebhooksService;
exports.WebhooksService = WebhooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WebhooksService);
//# sourceMappingURL=webhooks.service.js.map