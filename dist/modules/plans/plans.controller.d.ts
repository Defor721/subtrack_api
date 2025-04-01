import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    getAll(): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    }[]>;
    getOne(id: string): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    }>;
    create(dto: CreatePlanDto): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdatePlanDto): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
