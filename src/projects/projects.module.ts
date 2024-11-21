import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { ProjectsController } from './projects.controller';
import { StatusProject } from './entity/statusProject.entity';
import { Management } from './entity/management.entity';
import { UbicationEntity } from './entity/ubication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      StatusProject,
      Management, 
      UbicationEntity
    ])
  ],
  providers: [ProjectsService],
  exports: [ProjectsService, TypeOrmModule],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
