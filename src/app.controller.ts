import { Body, Controller, Get, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CredentialDto } from './auth/dto/credentials.dto';
import { Roles } from './common/decorators/roles.decorator';
import { Role } from './common/enums/roles.enum';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { CreatedSimpleUserDto } from './users/dto/createdSimpleUser.dto';
import { Request } from 'express';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { CredentialVisitDto } from './auth/dto/credential-visit.dto';
import { JwtAuthGuardVisit } from './auth/guards/jwt-auth-visit.guard';
import { EventsInterceptor } from './common/interceptor/events.interceptor';
import { LoginResponse } from './auth/types/login';
import { Users } from './users/entity/users.entity';
import { OtpValidate } from './auth/types/otp';

@ApiTags('Autenticación')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('auth/login')
  async login(@Body() credentialsDTO: CredentialDto): Promise<LoginResponse> {
    return this.authService.login(credentialsDTO);
  }

  @Post('auth/login-visit')
  async loginVisit(@Body() credentialsDTO: CredentialVisitDto): Promise<{ message: string }> {
    return this.authService.loginVisit(credentialsDTO);
  }

  @Post('auth/register')
  async register(@Body() signUpDto: CreatedSimpleUserDto): Promise<Users> {
    return this.authService.simpleRegister(signUpDto);
  }

  @Get('auth/refresh-token')
  @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() req: Request): Promise<{ access_token: string }> {
    return this.authService.updateAccesToken(req.user);
  }

  @Get('auth/otp-access/:otp')
  async otpAccess(@Param('otp') otp: string): Promise<OtpValidate> {
    return this.authService.validateOTPCode(otp);
  }

  @Get('prueba')
  @UseInterceptors(EventsInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client, Role.Admin, Role.SuperAdmin)
  async test(): Promise<string> {
    return 'Estas usando uno de nuestros tokens de Acceso valido, Bienvenido!';
  }

  @Get('prueba-visitante')
  @UseInterceptors(EventsInterceptor)
  @UseGuards(JwtAuthGuardVisit, RolesGuard)
  async testVisitante(): Promise<string> {
    return 'Estas usando uno de nuestros tokens de Acceso valido de visitante, Bienvenido!';
  }

}

