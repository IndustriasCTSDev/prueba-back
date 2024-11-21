import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('passport.jwt.secret'),
        });
    }

    async validate(payload: any) {

        if (payload.is_refresh) {
            return { is_refresh: payload.is_refresh, userId: payload.id, username: payload.name, rol: payload.rol.name }
        }

        return { is_refresh: payload.is_refresh, userId: payload.id, username: payload.name, rol: payload.rol.name };
    }
}