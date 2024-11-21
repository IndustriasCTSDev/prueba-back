import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtAuthGuardVisit } from './jwt-auth-visit.guard';

@Injectable()
export class DualAuthGuard implements CanActivate {
    constructor(
        private readonly jwtAuthGuard: JwtAuthGuard,
        private readonly jwtAuthGuardVisit: JwtAuthGuardVisit,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            // Intenta autenticación con JwtAuthGuard
            return await this.jwtAuthGuard.canActivate(context) as boolean;
        } catch (error) {
            // Si JwtAuthGuard falla, intenta con JwtAuthGuardVisit
            try {
                return await this.jwtAuthGuardVisit.canActivate(context) as boolean;
            } catch (error) {
                // Si ambos guards fallan, lanza una excepción
                throw new UnauthorizedException('Acceso Denegado, intente nuevamente.');
            }
        }
    }
}
