import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
export declare class PlansService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePlanDto): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, dto: Partial<CreatePlanDto>): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    }>;
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
    delete(id: string): Promise<{
        name: string;
        price: number;
        description: string;
        id: string;
        createdAt: Date;
    }>;
}
