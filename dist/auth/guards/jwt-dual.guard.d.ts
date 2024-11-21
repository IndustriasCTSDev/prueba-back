import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtAuthGuardVisit } from './jwt-auth-visit.guard';
export declare class DualAuthGuard implements CanActivate {
    private readonly jwtAuthGuard;
    private readonly jwtAuthGuardVisit;
    constructor(jwtAuthGuard: JwtAuthGuard, jwtAuthGuardVisit: JwtAuthGuardVisit);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
