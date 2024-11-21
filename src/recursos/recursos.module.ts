import { Module } from '@nestjs/common';
import { RecursosService } from './recursos.service';
import { RecursosController } from './recursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './entity/folder.entity';
import { Bucket } from './entity/bucket.entity';
import { BusinessUnitModule } from 'src/business_unit/business_unit.module';
import { Attachment } from './entity/attachments.entity';
import { S3SourcesModule } from 'src/s3-sources/s3-sources.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { AuthModule } from 'src/auth/auth.module';
import { TemplateModule } from 'src/template/template.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Folder, Bucket, Attachment]),
    BusinessUnitModule,
    S3SourcesModule,
    ProjectsModule,
    AuthModule,
    TemplateModule
  ],
  providers: [RecursosService],
  controllers: [RecursosController],
  exports: [RecursosService, TypeOrmModule]
})
export class RecursosModule { }
