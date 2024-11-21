import { ProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private projectService;
    constructor(projectService: ProjectsService);
    createProject(projectDto: ProjectDto): Promise<import("./entity/project.entity").Project>;
}
