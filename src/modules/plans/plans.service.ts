// plans.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlanDto) {
    // 예시: 이름에 따라 id를 자동 설정
    const id = dto.name.toLowerCase().replace(/\s+/g, '-'); // ex: 'Basic Plan' → 'basic-plan'

    return this.prisma.plan.create({
      data: {
        id, // ✅ 문자열 기반 ID를 직접 생성
        ...dto,
      },
    });
  }
  async update(id: string, dto: Partial<CreatePlanDto>) {
    return this.prisma.plan.update({
      where: { id },
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.plan.findMany();
  }

  async findOne(id: string) {
    return this.prisma.plan.findUnique({ where: { id } });
  }

  async delete(id: string) {
    return this.prisma.plan.delete({ where: { id } });
  }
}
