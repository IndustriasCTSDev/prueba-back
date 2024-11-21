import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtVisitStrategy extends PassportStrategy(Strategy, 'jwt-visit') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('passport.jwt.secret'),
        });
    }

    async validate(payload: any) {
        if (payload.is_refresh || payload.rol) {
            throw new UnauthorizedException('No autorizado');
        }
        return { userId: payload.id, visiter: true, ...payload };
    }
}