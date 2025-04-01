import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlansService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    delete(id: string): Promise<boolean>;
}
