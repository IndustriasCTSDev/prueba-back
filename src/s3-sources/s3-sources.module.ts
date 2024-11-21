import { Module } from '@nestjs/common';
import { S3SourcesService } from './s3-sources.service';

@Module({
  providers: [S3SourcesService],
  exports: [S3SourcesService],
})
export class S3SourcesModule {}
