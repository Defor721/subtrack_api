import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/get-user.decorator';

@Controller('plans')
@UseGuards(JwtAuthGuard)
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  // ✅ 전체 요금제 목록 조회 (로그인한 유저 누구나 가능)
  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  return this.plansService.findOne(id);
}

  // ✅ 요금제 생성 - 관리자만 가능
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreatePlanDto) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('관리자만 요금제를 생성할 수 있습니다.');
    }
    return this.plansService.create(dto);
  }

  // ✅ 요금제 수정 - 관리자만 가능
  @Put(':id')
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdatePlanDto) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('관리자만 요금제를 수정할 수 있습니다.');
    }
    return this.plansService.update(id, dto);
  }

  // ✅ 요금제 삭제 - 관리자만 가능
  @Delete(':id')
  delete(@CurrentUser() user: any, @Param('id') id: string) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('관리자만 요금제를 삭제할 수 있습니다.');
    }
    return this.plansService.delete(id);
  }
}
