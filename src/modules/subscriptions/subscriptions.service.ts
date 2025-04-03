import { Injectable, NotFoundException,ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateSubscriptionDto) {
    const plan = await this.prisma.plan.findUnique({
      where: { id: dto.planId },
    });
    if (!plan) throw new NotFoundException('해당 요금제가 존재하지 않습니다.');
    const existing = await this.prisma.subscription.findFirst({
      where: { userId },
    });
    if (existing) {
      throw new ConflictException('이미 구독 중입니다.');
    }
    
    return this.prisma.subscription.create({
      data: {
        userId,
        planId: dto.planId,
      },
      include: { plan: true },
    });
  }
  async findMySubscriptions(userId: string) {
    return this.prisma.subscription.findFirst({
      where: { userId },
      include: { plan: true },
    });
  }

  async cancel(userId: string) {
    const existing = await this.prisma.subscription.findFirst({
    where: { userId },
    });
    if (!existing) throw new NotFoundException('구독 내역이 없습니다.');
    return this.prisma.subscription.delete({
    where: { id: existing.id },
  });
}}