import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CredentialDto } from './dto/credentials.dto';
import * as bcrypt from 'bcryptjs'
import { CreatedSimpleUserDto } from 'src/users/dto/createdSimpleUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entity/refreshToken.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { CredentialVisitDto } from './dto/credential-visit.dto';
import { VisitanteService } from 'src/visitante/visitante.service';
import * as speakyeasy from 'speakeasy'
import { ConfigService } from '@nestjs/config';
import { MailerService } from 'src/mailer/mailer.service';
import { CustomUnauthorizedException } from 'src/common/errors/all-exceptions.filter';
import { LoginResponse } from './types/login';
import { OtpValidate } from './types/otp';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private visitanteService: VisitanteService,
        private jwtService: JwtService,
        @InjectRepository(RefreshToken)
        private refreshTokenRepository: Repository<RefreshToken>,
        private configService: ConfigService,
        private mailerService: MailerService
    ) { }

    async validateUser(email: string, password: string): Promise<Users> {
        try {
            const user = await this.userService.findByEmail(email);

            // Verifica si el usuario existe
            if (!user) {
                throw new UnauthorizedException('Acceso Denegado, intente nuevamente.');
            }

            const validPass = await this.validatePassword(password, user.credential.password);

            if (validPass) {
                const { credential, ...result } = user;
                return result; // Retorna el usuario sin la información de credenciales
            }

            throw new UnauthorizedException('Acceso Denegado, intente nuevamente.');
        } catch (error) {
            throw error; // Mantiene la propagación del error
        }
    }

    async validateOTPCode(code: string): Promise<OtpValidate> {
        // Verificar un token TOTP
        const isVerified = speakyeasy.totp.verify({
            secret: this.configService.get<string>('otp.secret'),
            encoding: 'base32',
            token: code,
            window: 2 // margen de tiempo permitido
        });

        try {
            if (isVerified) {
                const tmpVisited = await this.visitanteService.getVisitanteByOTP(parseInt(code));
                await this.visitanteService.updateLastAccess(tmpVisited);
                const access_token = this.jwtService.sign({
                    ...tmpVisited
                })

                return {
                    isAuthenticated: true,
                    access_token,
                    email: tmpVisited.email,
                    name: tmpVisited.name,
                    rol: 'viewer'
                }
            }

            throw new CustomUnauthorizedException('invalid_otp', 'Acceso Denegado, intente nuevamente.');
        } catch (error) {
            throw error;
        }
    }

    async login(credentials: CredentialDto): Promise<LoginResponse> {
        const validateLogin = await this.validateUser(credentials.email, credentials.password)

        const access_token = this.jwtService.sign({
            is_refresh: false,
            ...validateLogin
        })

        const refresh_token = this.jwtService.sign({
            is_refresh: true,
            ...validateLogin
        }, { expiresIn: '7d' })

        await this.saveRefreshToken(validateLogin, refresh_token)

        return {
            access_token,
            refresh_token,
            nombre: validateLogin.name,
            email: credentials.email,
            rol: validateLogin.rol.name
        }
    }

    async loginVisit(credentials: CredentialVisitDto): Promise<{ message: string }> {
        const { email } = credentials;

        // Generar código OTP temporal
        const tmpToken = await this.generatedOTPCode();

        // Verificar si el visitante ya existe o crear uno nuevo si no existe
        let visitante = await this.visitanteService.validateVisitante(email);

        if (!visitante) {
            visitante = await this.visitanteService.createVisitante({
                ...credentials,
                last_otp: tmpToken,
            });
        } else {
            // Actualizar el campo last_otp si el visitante ya existe
            await this.visitanteService.updateLastOtp(visitante, tmpToken);
        }

        await this.mailerService.sendMailOTP(visitante.email, tmpToken)

        return {
            message: 'Un código ha sido enviado al correo electrónico',
        };
    }


    async simpleRegister(dataInfo: CreatedSimpleUserDto): Promise<Users> {
        try {
            const register = await this.userService.createdUserWithCredentials(dataInfo)
            return register
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async saveRefreshToken(user_info: Users, jwt: string): Promise<RefreshToken | UpdateResult> {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Agrega 7 días a la fecha actual

        try {
            const firstTime = await this.refreshTokenRepository.exists({
                where: {
                    user: user_info
                }
            })

            if (!firstTime) {

                const r = this.refreshTokenRepository.create({
                    jwt,
                    user: user_info,
                    exp: expirationDate // Asigna la fecha de expiración calculada
                });

                return await this.refreshTokenRepository.save(r)
            }


            const qb = this.refreshTokenRepository
                .createQueryBuilder()
                .update(RefreshToken)
                .set({
                    jwt,
                    exp: expirationDate
                })
                .where("user_id = :id", { id: user_info.id })

            return await qb.execute()
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async updateAccesToken(user: any): Promise<{ access_token: string }> {

        if (!user.is_refresh) {
            throw new UnauthorizedException('No autorizado');
        }

        const tmpUser = await this.userService.findById(user.userId)
        const access_token = this.jwtService.sign({
            ...tmpUser,
            is_refresh: false,
        })

        return { access_token }
    }

    async validatePassword(tmpPassword: string, comparePassword: string): Promise<boolean> {
        const isMatch = bcrypt.compare(tmpPassword, comparePassword);
        return await isMatch
    }

    async generatedOTPCode() {
        const token = speakyeasy.totp({
            secret: this.configService.get<string>('otp.secret'),
            encoding: 'base32',
            window: 2
        })
        return token
    }

}
