import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategys/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/errors/all-exceptions.filter';
import { CredentialModule } from 'src/credential/credential.module';
import { RolesModule } from 'src/roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entity/refreshToken.entity';
import { JwtVisitStrategy } from './strategys/jwt-visit.strategy';
import { VisitanteModule } from 'src/visitante/visitante.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthGuardVisit } from './guards/jwt-auth-visit.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('passport.jwt.secret'),
        signOptions: { expiresIn: '1h' }
      })
    }),
    PassportModule,
    UsersModule,
    RolesModule,
    CredentialModule,
    VisitanteModule,
    MailerModule
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtVisitStrategy,
    UsersService,
    JwtAuthGuard,
    JwtAuthGuardVisit,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
  controllers: [],
  exports: [
    AuthService,
    JwtModule,
    PassportModule,
    JwtAuthGuard,
    JwtAuthGuardVisit
  ]
})
export class AuthModule { }
