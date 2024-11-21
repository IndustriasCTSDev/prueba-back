import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { OTPTemplate } from './templates/otp.template';

@Injectable()
export class MailerService {

    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('smtp.host'), // Cambia esto por el host de tu servidor SMTP
            port: this.configService.get<number>('smtp.port'), // Cambia el puerto si es necesario
            secure: false, // true para 465, false para otros puertos
            auth: {
                user: this.configService.get<string>('smtp.user'), // Tu usuario SMTP
                pass: this.configService.get<string>('smtp.pass'), // Tu contraseña SMTP
            },
        });
    }

    async sendMail(to: string, subject: string, text: string, html?: string) {
        const mailOptions = {
            from: this.configService.get<string>('smtp.from_address'), // Remitente
            to,
            subject,
            text,
            html, // HTML opcional
        };

        return this.transporter.sendMail(mailOptions);
    }

    async sendMailOTP(to: string, otp: number, subject: string = 'OTP') {
        const mailOptions: Mail.Options = {
            from: this.configService.get<string>('smtp.from_address'), // Remitente
            to,
            subject,
            html: OTPTemplate(otp)
        };

        return this.transporter.sendMail(mailOptions);
    }

}
