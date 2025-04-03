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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SubscriptionsService = class SubscriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const plan = await this.prisma.plan.findUnique({
            where: { id: dto.planId },
        });
        if (!plan)
            throw new common_1.NotFoundException('해당 요금제가 존재하지 않습니다.');
        const existing = await this.prisma.subscription.findFirst({
            where: { userId },
        });
        if (existing) {
            throw new common_1.ConflictException('이미 구독 중입니다.');
        }
        return this.prisma.subscription.create({
            data: {
                userId,
                planId: dto.planId,
            },
            include: { plan: true },
        });
    }
    async findMySubscriptions(userId) {
        return this.prisma.subscription.findFirst({
            where: { userId },
            include: { plan: true },
        });
    }
    async cancel(userId) {
        const existing = await this.prisma.subscription.findFirst({
            where: { userId },
        });
        if (!existing)
            throw new common_1.NotFoundException('구독 내역이 없습니다.');
        return this.prisma.subscription.delete({
            where: { id: existing.id },
        });
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map