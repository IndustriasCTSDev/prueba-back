"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const otp_template_1 = require("./templates/otp.template");
let MailerService = class MailerService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('smtp.host'),
            port: this.configService.get('smtp.port'),
            secure: false,
            auth: {
                user: this.configService.get('smtp.user'),
                pass: this.configService.get('smtp.pass'),
            },
        });
    }
    async sendMail(to, subject, text, html) {
        const mailOptions = {
            from: this.configService.get('smtp.from_address'),
            to,
            subject,
            text,
            html,
        };
        return this.transporter.sendMail(mailOptions);
    }
    async sendMailOTP(to, otp, subject = 'OTP') {
        const mailOptions = {
            from: this.configService.get('smtp.from_address'),
            to,
            subject,
            html: (0, otp_template_1.OTPTemplate)(otp)
        };
        return this.transporter.sendMail(mailOptions);
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailerService);
//# sourceMappingURL=mailer.service.js.map