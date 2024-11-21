import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entity/project.entity';
import { ProjectDto } from './dto/project.dto';
import { StatusProject } from './entity/statusProject.entity';
import { Management } from './entity/management.entity';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
        @InjectRepository(StatusProject)
        private statusProjectRepository: Repository<StatusProject>,
        @InjectRepository(Management)
        private managementRepository: Repository<Management>,
    ) { }

    async getProjectById(id: string): Promise<Project> {
        return await this.projectsRepository.findOneBy({ id })
    }

    async createProject(project: ProjectDto) {
        try {
            // Crear y guardar el nuevo proyecto
            const newProject = this.projectsRepository.create({ ...project });
            newProject.status = await this.getStatusProject(project.status_project_id);
            const savedProject = await this.projectsRepository.save(newProject);

            // Crear y guardar los management después de que el proyecto esté guardado
            const managementPromises = project.management.map((code) =>
                this.managementRepository.save(
                    this.managementRepository.create({ code, project_id: savedProject.id })
                )
            );

            // Esperar a que todos los management sean guardados
            await Promise.all(managementPromises);

            return savedProject;
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    }


    async getStatusProject(id?: number): Promise<StatusProject> {
        if (id) {
            return await this.statusProjectRepository.findOneBy({ id })
        }

        return await this.statusProjectRepository.findOneBy({ id: 3 })
    }

}
