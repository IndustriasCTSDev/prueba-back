"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./entity/project.entity");
const statusProject_entity_1 = require("./entity/statusProject.entity");
const management_entity_1 = require("./entity/management.entity");
let ProjectsService = class ProjectsService {
    constructor(projectsRepository, statusProjectRepository, managementRepository) {
        this.projectsRepository = projectsRepository;
        this.statusProjectRepository = statusProjectRepository;
        this.managementRepository = managementRepository;
    }
    async getProjectById(id) {
        return await this.projectsRepository.findOneBy({ id });
    }
    async createProject(project) {
        try {
            const newProject = this.projectsRepository.create({ ...project });
            newProject.status = await this.getStatusProject(project.status_project_id);
            const savedProject = await this.projectsRepository.save(newProject);
            const managementPromises = project.management.map((code) => this.managementRepository.save(this.managementRepository.create({ code, project_id: savedProject.id })));
            await Promise.all(managementPromises);
            return savedProject;
        }
        catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    }
    async getStatusProject(id) {
        if (id) {
            return await this.statusProjectRepository.findOneBy({ id });
        }
        return await this.statusProjectRepository.findOneBy({ id: 3 });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(statusProject_entity_1.StatusProject)),
    __param(2, (0, typeorm_1.InjectRepository)(management_entity_1.Management)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map