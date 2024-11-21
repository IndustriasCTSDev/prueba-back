import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateEntity } from './entity/template.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateEntity])
  ],
  providers: [TemplateService],
  exports: [TemplateService, TypeOrmModule],
})
export class TemplateModule {}
