"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuardVisit = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let JwtAuthGuardVisit = class JwtAuthGuardVisit extends (0, passport_1.AuthGuard)('jwt-visit') {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException('Acceso Denegado, intente nuevamente.');
        }
        return user;
    }
};
exports.JwtAuthGuardVisit = JwtAuthGuardVisit;
exports.JwtAuthGuardVisit = JwtAuthGuardVisit = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuardVisit);
//# sourceMappingURL=jwt-auth-visit.guard.js.map