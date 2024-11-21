"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategys/jwt.strategy");
const users_module_1 = require("../users/users.module");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const all_exceptions_filter_1 = require("../common/errors/all-exceptions.filter");
const credential_module_1 = require("../credential/credential.module");
const roles_module_1 = require("../roles/roles.module");
const typeorm_1 = require("@nestjs/typeorm");
const refreshToken_entity_1 = require("./entity/refreshToken.entity");
const jwt_visit_strategy_1 = require("./strategys/jwt-visit.strategy");
const visitante_module_1 = require("../visitante/visitante.module");
const mailer_module_1 = require("../mailer/mailer.module");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const jwt_auth_visit_guard_1 = require("./guards/jwt-auth-visit.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([refreshToken_entity_1.RefreshToken]),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('passport.jwt.secret'),
                    signOptions: { expiresIn: '1h' }
                })
            }),
            passport_1.PassportModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            credential_module_1.CredentialModule,
            visitante_module_1.VisitanteModule,
            mailer_module_1.MailerModule
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            jwt_visit_strategy_1.JwtVisitStrategy,
            users_service_1.UsersService,
            jwt_auth_guard_1.JwtAuthGuard,
            jwt_auth_visit_guard_1.JwtAuthGuardVisit,
            {
                provide: core_1.APP_FILTER,
                useClass: all_exceptions_filter_1.AllExceptionsFilter
            }
        ],
        controllers: [],
        exports: [
            auth_service_1.AuthService,
            jwt_1.JwtModule,
            passport_1.PassportModule,
            jwt_auth_guard_1.JwtAuthGuard,
            jwt_auth_visit_guard_1.JwtAuthGuardVisit
        ]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map