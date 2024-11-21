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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth/auth.service");
const credentials_dto_1 = require("./auth/dto/credentials.dto");
const roles_decorator_1 = require("./common/decorators/roles.decorator");
const roles_enum_1 = require("./common/enums/roles.enum");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const createdSimpleUser_dto_1 = require("./users/dto/createdSimpleUser.dto");
const swagger_1 = require("@nestjs/swagger");
const credential_visit_dto_1 = require("./auth/dto/credential-visit.dto");
const jwt_auth_visit_guard_1 = require("./auth/guards/jwt-auth-visit.guard");
const events_interceptor_1 = require("./common/interceptor/events.interceptor");
let AppController = class AppController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(credentialsDTO) {
        return this.authService.login(credentialsDTO);
    }
    async loginVisit(credentialsDTO) {
        return this.authService.loginVisit(credentialsDTO);
    }
    async register(signUpDto) {
        return this.authService.simpleRegister(signUpDto);
    }
    async refreshToken(req) {
        return this.authService.updateAccesToken(req.user);
    }
    async otpAccess(otp) {
        return this.authService.validateOTPCode(otp);
    }
    async test() {
        return 'Estas usando uno de nuestros tokens de Acceso valido, Bienvenido!';
    }
    async testVisitante() {
        return 'Estas usando uno de nuestros tokens de Acceso valido de visitante, Bienvenido!';
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [credentials_dto_1.CredentialDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('auth/login-visit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [credential_visit_dto_1.CredentialVisitDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "loginVisit", null);
__decorate([
    (0, common_1.Post)('auth/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createdSimpleUser_dto_1.CreatedSimpleUserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('auth/refresh-token'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('auth/otp-access/:otp'),
    __param(0, (0, common_1.Param)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "otpAccess", null);
__decorate([
    (0, common_1.Get)('prueba'),
    (0, common_1.UseInterceptors)(events_interceptor_1.EventsInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Client, roles_enum_1.Role.Admin, roles_enum_1.Role.SuperAdmin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "test", null);
__decorate([
    (0, common_1.Get)('prueba-visitante'),
    (0, common_1.UseInterceptors)(events_interceptor_1.EventsInterceptor),
    (0, common_1.UseGuards)(jwt_auth_visit_guard_1.JwtAuthGuardVisit, roles_guard_1.RolesGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testVisitante", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('Autenticación'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AppController);
//# sourceMappingURL=app.controller.js.map