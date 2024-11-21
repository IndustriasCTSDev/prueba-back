"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecursosModule = void 0;
const common_1 = require("@nestjs/common");
const recursos_service_1 = require("./recursos.service");
const recursos_controller_1 = require("./recursos.controller");
const typeorm_1 = require("@nestjs/typeorm");
const folder_entity_1 = require("./entity/folder.entity");
const bucket_entity_1 = require("./entity/bucket.entity");
const business_unit_module_1 = require("../business_unit/business_unit.module");
const attachments_entity_1 = require("./entity/attachments.entity");
const s3_sources_module_1 = require("../s3-sources/s3-sources.module");
const projects_module_1 = require("../projects/projects.module");
const auth_module_1 = require("../auth/auth.module");
const template_module_1 = require("../template/template.module");
let RecursosModule = class RecursosModule {
};
exports.RecursosModule = RecursosModule;
exports.RecursosModule = RecursosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([folder_entity_1.Folder, bucket_entity_1.Bucket, attachments_entity_1.Attachment]),
            business_unit_module_1.BusinessUnitModule,
            s3_sources_module_1.S3SourcesModule,
            projects_module_1.ProjectsModule,
            auth_module_1.AuthModule,
            template_module_1.TemplateModule
        ],
        providers: [recursos_service_1.RecursosService],
        controllers: [recursos_controller_1.RecursosController],
        exports: [recursos_service_1.RecursosService, typeorm_1.TypeOrmModule]
    })
], RecursosModule);
//# sourceMappingURL=recursos.module.js.map