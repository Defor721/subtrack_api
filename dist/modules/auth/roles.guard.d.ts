import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RolesGuard implements CanActivate {
    private requiredRole;
    constructor(requiredRole: string);
    canActivate(context: ExecutionContext): boolean;
}
