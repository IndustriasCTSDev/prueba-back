import { AuthService } from './auth/auth.service';
import { CredentialDto } from './auth/dto/credentials.dto';
import { CreatedSimpleUserDto } from './users/dto/createdSimpleUser.dto';
import { Request } from 'express';
import { CredentialVisitDto } from './auth/dto/credential-visit.dto';
import { LoginResponse } from './auth/types/login';
import { Users } from './users/entity/users.entity';
import { OtpValidate } from './auth/types/otp';
export declare class AppController {
    private readonly authService;
    constructor(authService: AuthService);
    login(credentialsDTO: CredentialDto): Promise<LoginResponse>;
    loginVisit(credentialsDTO: CredentialVisitDto): Promise<{
        message: string;
    }>;
    register(signUpDto: CreatedSimpleUserDto): Promise<Users>;
    refreshToken(req: Request): Promise<{
        access_token: string;
    }>;
    otpAccess(otp: string): Promise<OtpValidate>;
    test(): Promise<string>;
    testVisitante(): Promise<string>;
}
