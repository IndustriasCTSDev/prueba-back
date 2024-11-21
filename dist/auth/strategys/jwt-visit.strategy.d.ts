import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtVisitStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtVisitStrategy extends JwtVisitStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<any>;
}
export {};
