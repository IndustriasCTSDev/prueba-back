import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CredentialDto } from './dto/credentials.dto';
import { CreatedSimpleUserDto } from 'src/users/dto/createdSimpleUser.dto';
import { RefreshToken } from './entity/refreshToken.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { CredentialVisitDto } from './dto/credential-visit.dto';
import { VisitanteService } from 'src/visitante/visitante.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from 'src/mailer/mailer.service';
import { LoginResponse } from './types/login';
import { OtpValidate } from './types/otp';
export declare class AuthService {
    private userService;
    private visitanteService;
    private jwtService;
    private refreshTokenRepository;
    private configService;
    private mailerService;
    constructor(userService: UsersService, visitanteService: VisitanteService, jwtService: JwtService, refreshTokenRepository: Repository<RefreshToken>, configService: ConfigService, mailerService: MailerService);
    validateUser(email: string, password: string): Promise<Users>;
    validateOTPCode(code: string): Promise<OtpValidate>;
    login(credentials: CredentialDto): Promise<LoginResponse>;
    loginVisit(credentials: CredentialVisitDto): Promise<{
        message: string;
    }>;
    simpleRegister(dataInfo: CreatedSimpleUserDto): Promise<Users>;
    saveRefreshToken(user_info: Users, jwt: string): Promise<RefreshToken | UpdateResult>;
    updateAccesToken(user: any): Promise<{
        access_token: string;
    }>;
    validatePassword(tmpPassword: string, comparePassword: string): Promise<boolean>;
    generatedOTPCode(): Promise<any>;
}
