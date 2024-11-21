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
exports.S3SourcesService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let S3SourcesService = class S3SourcesService {
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.get('aws.region'),
            credentials: {
                accessKeyId: this.configService.get('aws.s3.accessKeyId'),
                secretAccessKey: this.configService.get('aws.s3.secretAccessKey'),
            },
        });
    }
    async getSignedUrl(key, expiresInSeconds = 60) {
        const bucket = this.configService.get('aws.s3.bucketName');
        try {
            const command = new client_s3_1.GetObjectCommand({ Bucket: bucket, Key: key });
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn: expiresInSeconds });
            return url;
        }
        catch (error) {
            console.error(`Error al generar la URL firmada: ${error}`);
            throw error;
        }
    }
    async uploadFile(key, file) {
        const bucket = this.configService.get('aws.s3.bucketName');
        const s3Params = {
            Bucket: bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        await this.s3Client.send(new client_s3_1.PutObjectCommand(s3Params));
    }
};
exports.S3SourcesService = S3SourcesService;
exports.S3SourcesService = S3SourcesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3SourcesService);
//# sourceMappingURL=s3-sources.service.js.map