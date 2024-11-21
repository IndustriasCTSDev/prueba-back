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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const typeorm_1 = require("@nestjs/typeorm");
const refreshToken_entity_1 = require("./entity/refreshToken.entity");
const typeorm_2 = require("typeorm");
const visitante_service_1 = require("../visitante/visitante.service");
const speakyeasy = require("speakeasy");
const config_1 = require("@nestjs/config");
const mailer_service_1 = require("../mailer/mailer.service");
const all_exceptions_filter_1 = require("../common/errors/all-exceptions.filter");
let AuthService = class AuthService {
    constructor(userService, visitanteService, jwtService, refreshTokenRepository, configService, mailerService) {
        this.userService = userService;
        this.visitanteService = visitanteService;
        this.jwtService = jwtService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.configService = configService;
        this.mailerService = mailerService;
    }
    async validateUser(email, password) {
        try {
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new common_1.UnauthorizedException('Acceso Denegado, intente nuevamente.');
            }
            const validPass = await this.validatePassword(password, user.credential.password);
            if (validPass) {
                const { credential, ...result } = user;
                return result;
            }
            throw new common_1.UnauthorizedException('Acceso Denegado, intente nuevamente.');
        }
        catch (error) {
            throw error;
        }
    }
    async validateOTPCode(code) {
        const isVerified = speakyeasy.totp.verify({
            secret: this.configService.get('otp.secret'),
            encoding: 'base32',
            token: code,
            window: 2
        });
        try {
            if (isVerified) {
                const tmpVisited = await this.visitanteService.getVisitanteByOTP(parseInt(code));
                await this.visitanteService.updateLastAccess(tmpVisited);
                const access_token = this.jwtService.sign({
                    ...tmpVisited
                });
                return {
                    isAuthenticated: true,
                    access_token,
                    email: tmpVisited.email,
                    name: tmpVisited.name,
                    rol: 'viewer'
                };
            }
            throw new all_exceptions_filter_1.CustomUnauthorizedException('invalid_otp', 'Acceso Denegado, intente nuevamente.');
        }
        catch (error) {
            throw error;
        }
    }
    async login(credentials) {
        const validateLogin = await this.validateUser(credentials.email, credentials.password);
        const access_token = this.jwtService.sign({
            is_refresh: false,
            ...validateLogin
        });
        const refresh_token = this.jwtService.sign({
            is_refresh: true,
            ...validateLogin
        }, { expiresIn: '7d' });
        await this.saveRefreshToken(validateLogin, refresh_token);
        return {
            access_token,
            refresh_token,
            nombre: validateLogin.name,
            email: credentials.email,
            rol: validateLogin.rol.name
        };
    }
    async loginVisit(credentials) {
        const { email } = credentials;
        const tmpToken = await this.generatedOTPCode();
        let visitante = await this.visitanteService.validateVisitante(email);
        if (!visitante) {
            visitante = await this.visitanteService.createVisitante({
                ...credentials,
                last_otp: tmpToken,
            });
        }
        else {
            await this.visitanteService.updateLastOtp(visitante, tmpToken);
        }
        await this.mailerService.sendMailOTP(visitante.email, tmpToken);
        return {
            message: 'Un código ha sido enviado al correo electrónico',
        };
    }
    async simpleRegister(dataInfo) {
        try {
            const register = await this.userService.createdUserWithCredentials(dataInfo);
            return register;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async saveRefreshToken(user_info, jwt) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        try {
            const firstTime = await this.refreshTokenRepository.exists({
                where: {
                    user: user_info
                }
            });
            if (!firstTime) {
                const r = this.refreshTokenRepository.create({
                    jwt,
                    user: user_info,
                    exp: expirationDate
                });
                return await this.refreshTokenRepository.save(r);
            }
            const qb = this.refreshTokenRepository
                .createQueryBuilder()
                .update(refreshToken_entity_1.RefreshToken)
                .set({
                jwt,
                exp: expirationDate
            })
                .where("user_id = :id", { id: user_info.id });
            return await qb.execute();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updateAccesToken(user) {
        if (!user.is_refresh) {
            throw new common_1.UnauthorizedException('No autorizado');
        }
        const tmpUser = await this.userService.findById(user.userId);
        const access_token = this.jwtService.sign({
            ...tmpUser,
            is_refresh: false,
        });
        return { access_token };
    }
    async validatePassword(tmpPassword, comparePassword) {
        const isMatch = bcrypt.compare(tmpPassword, comparePassword);
        return await isMatch;
    }
    async generatedOTPCode() {
        const token = speakyeasy.totp({
            secret: this.configService.get('otp.secret'),
            encoding: 'base32',
            window: 2
        });
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(refreshToken_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        visitante_service_1.VisitanteService,
        jwt_1.JwtService,
        typeorm_2.Repository,
        config_1.ConfigService,
        mailer_service_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map