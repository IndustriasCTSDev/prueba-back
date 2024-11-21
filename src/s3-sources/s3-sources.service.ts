import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3SourcesService {

    private s3Client: S3Client;

    constructor(private configService: ConfigService) {
        this.s3Client = new S3Client({
            region: this.configService.get<string>('aws.region'), // Cambia a tu región
            credentials: {
                accessKeyId: this.configService.get<string>('aws.s3.accessKeyId'),
                secretAccessKey: this.configService.get<string>('aws.s3.secretAccessKey'),
            },
        });
    }


    async getSignedUrl(key: string, expiresInSeconds: number = 60): Promise<string> {
        const bucket = this.configService.get<string>('aws.s3.bucketName');
        try {
            const command = new GetObjectCommand({ Bucket: bucket, Key: key });
            const url = await getSignedUrl(this.s3Client, command, { expiresIn: expiresInSeconds });
            return url;
        } catch (error) {
            console.error(`Error al generar la URL firmada: ${error}`);
            throw error;
        }
    }

    async uploadFile(key: string, file: Express.Multer.File): Promise<void> {
        const bucket = this.configService.get<string>('aws.s3.bucketName');
        const s3Params = {
            Bucket: bucket, // Asegúrate de que `tmpBucket.name` tiene el nombre del bucket S3
            Key: key,
            Body: file.buffer, // Archivo en formato buffer
            ContentType: file.mimetype,
        };


        // Subir el archivo a S3
        await this.s3Client.send(new PutObjectCommand(s3Params));
    }
}
