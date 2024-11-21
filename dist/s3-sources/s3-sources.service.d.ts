import { ConfigService } from '@nestjs/config';
export declare class S3SourcesService {
    private configService;
    private s3Client;
    constructor(configService: ConfigService);
    getSignedUrl(key: string, expiresInSeconds?: number): Promise<string>;
    uploadFile(key: string, file: Express.Multer.File): Promise<void>;
}
