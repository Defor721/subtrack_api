import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    findAll(): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    } | null>;
    create(user: any, dto: CreatePlanDto): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    }>;
    update(user: any, id: string, dto: UpdatePlanDto): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    }>;
    delete(user: any, id: string): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    }>;
}
