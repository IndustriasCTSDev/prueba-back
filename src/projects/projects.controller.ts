import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EventsInterceptor } from 'src/common/interceptor/events.interceptor';

@Controller('projects')
@UseInterceptors(EventsInterceptor)
export class ProjectsController {

    constructor(
        private projectService: ProjectsService
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createProject(@Body() projectDto: ProjectDto) {
        return await this.projectService.createProject(projectDto)
    }

}
