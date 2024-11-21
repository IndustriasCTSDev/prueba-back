import { Repository } from 'typeorm';
import { Project } from './entity/project.entity';
import { ProjectDto } from './dto/project.dto';
import { StatusProject } from './entity/statusProject.entity';
import { Management } from './entity/management.entity';
export declare class ProjectsService {
    private projectsRepository;
    private statusProjectRepository;
    private managementRepository;
    constructor(projectsRepository: Repository<Project>, statusProjectRepository: Repository<StatusProject>, managementRepository: Repository<Management>);
    getProjectById(id: string): Promise<Project>;
    createProject(project: ProjectDto): Promise<Project>;
    getStatusProject(id?: number): Promise<StatusProject>;
}
