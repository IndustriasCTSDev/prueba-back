import { ConfigService } from '@nestjs/config';
export declare class MailerService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendMail(to: string, subject: string, text: string, html?: string): Promise<any>;
    sendMailOTP(to: string, otp: number, subject?: string): Promise<any>;
}
