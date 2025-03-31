import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  async getAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const plan = await this.plansService.findOne(id);
    if (!plan) {
      throw new NotFoundException(`ID ${id} 요금제를 찾을 수 없습니다.`);
    }
    return plan;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: CreatePlanDto) {
    return this.plansService.create(dto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('수정할 값을 1개 이상 보내야 합니다.');
    }

    const updated = await this.plansService.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`ID ${id} 요금제를 찾을 수 없습니다.`);
    }

    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.plansService.delete(id);
      return { success: true };
    } catch (err) {
      throw new NotFoundException(`ID ${id} 요금제를 찾을 수 없습니다.`);
    }
  }
}
