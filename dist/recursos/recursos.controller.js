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
exports.RecursosController = void 0;
const common_1 = require("@nestjs/common");
const recursos_service_1 = require("./recursos.service");
const bucket_dto_1 = require("./dto/bucket.dto");
const bucketPaginated_dto_1 = require("./dto/bucketPaginated.dto");
const events_interceptor_1 = require("../common/interceptor/events.interceptor");
const swagger_1 = require("@nestjs/swagger");
const jwt_dual_guard_1 = require("../auth/guards/jwt-dual.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const folder_dto_1 = require("./dto/folder.dto");
const attachment_dto_1 = require("./dto/attachment.dto");
const platform_express_1 = require("@nestjs/platform-express");
let RecursosController = class RecursosController {
    constructor(recursosService) {
        this.recursosService = recursosService;
    }
    async getRecurso(id, businessUnit) {
        return await this.recursosService.getFolderHierarchy(id, businessUnit);
    }
    async postFolders(data) {
        return await this.recursosService.createFolder(data);
    }
    async putFolders(id, data) {
        return await this.recursosService.updateFolder(id, data);
    }
    async getAttachment(path) {
        return this.recursosService.getAttachment(path);
    }
    async postAttachment(body, file) {
        return await this.recursosService.createAttachment(body, file);
    }
    async getBucketsPaginate(bucketData) {
        return await this.recursosService.getBucketsPaginated(bucketData, {
            page: bucketData.page,
            limit: bucketData.limit
        });
    }
    async getBucketById(id) {
        return await this.recursosService.getBucketById(id);
    }
    async createBucket(bucketData) {
        return await this.recursosService.createBucket(bucketData);
    }
};
exports.RecursosController = RecursosController;
__decorate([
    (0, common_1.Get)('general/:id'),
    (0, common_1.UseGuards)(jwt_dual_guard_1.DualAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('businessUnit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecursosController.prototype, "getRecurso", null);
__decorate([
    (0, common_1.Post)('folders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [folder_dto_1.FolderDto]),
    __metadata("design:returntype", Promise)
], RecursosController.prototype, "postFolders", null);
__decorate([
    (0, common_1.Put)('folders/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, folder_dto_1.FolderDto]),
    __metadata("design:returntype", Promise)
], RecursosController.prototype, "putFolders", null);
__decorate([
    (0, common_1.Get)('attachment/:path'),
    (0, common_1.UseGuards)(jwt_dual_guard_1.DualAuthGuard),
    __param(0, (0, common_1.Param)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecursosController.prototype, "getAttachment", null);
__decorate([
    (0, common_1.Post)('attachment'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attachment_dto_1.AttachmentDto, Object]),
    __metadata("design:returntype", Promise)
], RecursosController.prototype, "postAttachment", null);
__decorate([
    (0, common_1.Get)('bucket'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bucketPaginated_dto_1.BucketPaginatedDto]),
    __metadata("design:returntype", Promise)
], RecursosController.prototype, "getBucketsPaginate", null);
__decorate([
    (0, common_1.Get)('bucket/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecursosController.prototype, "getBucketById", null);
__decorate([
    (0, common_1.Post)('bucket'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bucket_dto_1.BucketDto]),
    __metadata("design:returntype", Promise)
], RecursosController.prototype, "createBucket", null);
exports.RecursosController = RecursosController = __decorate([
    (0, swagger_1.ApiTags)('Recursos'),
    (0, common_1.Controller)('recursos'),
    (0, common_1.UseInterceptors)(events_interceptor_1.EventsInterceptor),
    __metadata("design:paramtypes", [recursos_service_1.RecursosService])
], RecursosController);
//# sourceMappingURL=recursos.controller.js.map