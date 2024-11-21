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
exports.SettingsAppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const settings_app_service_1 = require("./settings-app.service");
const template_dto_1 = require("../template/dto/template.dto");
const template_service_1 = require("../template/template.service");
const events_interceptor_1 = require("../common/interceptor/events.interceptor");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SettingsAppController = class SettingsAppController {
    constructor(settingsAppService, templateService) {
        this.settingsAppService = settingsAppService;
        this.templateService = templateService;
    }
    async getTemplates(query) {
        return await this.templateService.getTemplates({ page: query.page, limit: query.limit });
    }
    async getTemplateById(id) {
        return await this.templateService.getTemplateById(id);
    }
    async createTemplate(templateDto) {
        return await this.templateService.createTemplate(templateDto);
    }
    async updateTemplate(id, templateDto) {
        return await this.templateService.updateTemplate(id, templateDto);
    }
    async getAdmins(query) {
        return await this.settingsAppService.getAdmins({ page: query.page, limit: query.limit });
    }
};
exports.SettingsAppController = SettingsAppController;
__decorate([
    (0, common_1.Get)('templates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The list of templates has been successfully retrieved.',
        type: nestjs_typeorm_paginate_1.Pagination
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SettingsAppController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Get)('templates/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The template has been successfully retrieved.',
        type: template_dto_1.TemplateDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SettingsAppController.prototype, "getTemplateById", null);
__decorate([
    (0, common_1.Post)('templates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The template has been successfully created.',
        type: template_dto_1.TemplateDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [template_dto_1.TemplateDto]),
    __metadata("design:returntype", Promise)
], SettingsAppController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Put)('templates/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The template has been successfully updated.',
        type: template_dto_1.TemplateDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, template_dto_1.TemplateDto]),
    __metadata("design:returntype", Promise)
], SettingsAppController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Get)('admins'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The list of admins has been successfully retrieved.',
        type: nestjs_typeorm_paginate_1.Pagination
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SettingsAppController.prototype, "getAdmins", null);
exports.SettingsAppController = SettingsAppController = __decorate([
    (0, swagger_1.ApiTags)('settings-app'),
    (0, common_1.Controller)('settings-app'),
    (0, common_1.UseInterceptors)(events_interceptor_1.EventsInterceptor),
    __metadata("design:paramtypes", [settings_app_service_1.SettingsAppService,
        template_service_1.TemplateService])
], SettingsAppController);
//# sourceMappingURL=settings-app.controller.js.map