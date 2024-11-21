"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DualAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const jwt_auth_visit_guard_1 = require("./jwt-auth-visit.guard");
let DualAuthGuard = class DualAuthGuard {
    constructor(jwtAuthGuard, jwtAuthGuardVisit) {
        this.jwtAuthGuard = jwtAuthGuard;
        this.jwtAuthGuardVisit = jwtAuthGuardVisit;
    }
    async canActivate(context) {
        try {
            return await this.jwtAuthGuard.canActivate(context);
        }
        catch (error) {
            try {
                return await this.jwtAuthGuardVisit.canActivate(context);
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Acceso Denegado, intente nuevamente.');
            }
        }
    }
};
exports.DualAuthGuard = DualAuthGuard;
exports.DualAuthGuard = DualAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_auth_guard_1.JwtAuthGuard,
        jwt_auth_visit_guard_1.JwtAuthGuardVisit])
], DualAuthGuard);
//# sourceMappingURL=jwt-dual.guard.js.map