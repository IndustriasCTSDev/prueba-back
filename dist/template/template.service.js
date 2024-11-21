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
exports.TemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const template_entity_1 = require("./entity/template.entity");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let TemplateService = class TemplateService {
    constructor(templateRepository) {
        this.templateRepository = templateRepository;
    }
    async getTemplates(options) {
        try {
            if (options) {
                const queryBuilder = this.templateRepository.createQueryBuilder('template_v1');
                return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, options);
            }
            return await this.templateRepository.find();
        }
        catch (error) {
            throw error;
        }
    }
    async getTemplateById(id) {
        return await this.templateRepository.findOneBy({ id });
    }
    async createTemplate(templateDto) {
        try {
            const newTemplate = this.templateRepository.create({
                name: templateDto.name,
                config: templateDto.config,
            });
            const savedTemplate = await this.templateRepository.save(newTemplate);
            return savedTemplate;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error creating template: ${error.message}`);
        }
    }
    async updateTemplate(id, templateDto) {
        try {
            const template = await this.templateRepository.findOneBy({ id });
            if (!template) {
                throw new common_1.NotFoundException(`Template with ID ${id} not found`);
            }
            template.name = templateDto.name;
            template.config = templateDto.config;
            const updatedTemplate = await this.templateRepository.save(template);
            return updatedTemplate;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error updating template with ID ${id}: ${error.message}`);
        }
    }
};
exports.TemplateService = TemplateService;
exports.TemplateService = TemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(template_entity_1.TemplateEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TemplateService);
//# sourceMappingURL=template.service.js.map