import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<{
        id: string;
        email: string;
    }[]>;
    signup(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
    }>;
    handleOptions(res: Response): any;
}
