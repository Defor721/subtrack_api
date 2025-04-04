// auth/roles.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private requiredRole: string) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user || user.role !== this.requiredRole) {
        throw new ForbiddenException('관리자 권한이 필요합니다.');
      }
  
      return true;
    }
  }
  