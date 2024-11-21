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
exports.RecursosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const folder_entity_1 = require("./entity/folder.entity");
const typeorm_2 = require("typeorm");
const bucket_entity_1 = require("./entity/bucket.entity");
const business_unit_service_1 = require("../business_unit/business_unit.service");
const s3_sources_service_1 = require("../s3-sources/s3-sources.service");
const projects_service_1 = require("../projects/projects.service");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const attachments_entity_1 = require("./entity/attachments.entity");
const uuid_1 = require("uuid");
const path = require("path");
const template_service_1 = require("../template/template.service");
let RecursosService = class RecursosService {
    constructor(folderRepository, bucketRepository, attachmentRepository, businessUnitService, s3SourcesService, projectService, templateService) {
        this.folderRepository = folderRepository;
        this.bucketRepository = bucketRepository;
        this.attachmentRepository = attachmentRepository;
        this.businessUnitService = businessUnitService;
        this.s3SourcesService = s3SourcesService;
        this.projectService = projectService;
        this.templateService = templateService;
    }
    async getFolderHierarchy(id, business_unit_id) {
        const businessUnit = await this.businessUnitService.getBusinessUnit(business_unit_id);
        const bucket = await this.getBucketByProjectAndBusinessUnit(id, businessUnit.id);
        if (bucket) {
            bucket.folders = await this.folderRepository.find({
                relations: { parent: true, bucket: true, attachments: true },
                select: ['id', 'name', 'sequence', 'icon', 'color', 'parent', 'children', 'attachments'],
                where: { bucket: { id: bucket.id }, parent: (0, typeorm_2.IsNull)() },
                order: { sequence: 'ASC' }
            });
            bucket.folders = await this.getChildrenHierarchy(bucket.folders);
            return bucket.folders;
        }
        const folder = await this.folderRepository.findOne({
            relations: { parent: true, children: true, attachments: true, bucket: true },
            where: {
                id: id,
                bucket: {
                    business_unit: businessUnit
                }
            },
            select: ['id', 'name', 'sequence', 'icon', 'color', 'parent', 'children', 'attachments'],
            order: { sequence: 'ASC' }
        });
        if (folder) {
            folder.parent = await this.getParentHierarchy(folder.parent);
            folder.children = await this.getChildrenHierarchy(folder.children);
            return folder;
        }
        throw new common_1.NotFoundException(`No se econtró ningú́n recurso con el ID ${id}`);
    }
    async getBucketByProjectAndBusinessUnit(project_id, business_unit_id) {
        const bucket = await this.bucketRepository.findOne({
            where: {
                id: project_id
            }
        });
        if (bucket) {
            project_id = bucket.project_id;
        }
        const project = await this.projectService.getProjectById(project_id);
        const businessUnit = await this.businessUnitService.getBusinessUnit(business_unit_id);
        if (project) {
            return await this.bucketRepository.findOne({
                select: ['id', 'folders'],
                where: { project, business_unit: businessUnit }
            });
        }
        return null;
    }
    async getParentHierarchy(folder) {
        if (!folder)
            return null;
        const parentFolder = await this.folderRepository.findOne({
            where: { id: folder.id },
            relations: { parent: true },
            select: ['id', 'name', 'sequence', 'icon', 'color', 'parent', 'children', 'attachments'],
            order: { sequence: 'ASC' }
        });
        if (parentFolder) {
            parentFolder.parent = await this.getParentHierarchy(parentFolder.parent);
        }
        return parentFolder;
    }
    async getChildrenHierarchy(children) {
        if (children.length === 0)
            return [];
        const loadedChildren = await Promise.all(children.map(async (child) => {
            const folder = await this.folderRepository.findOne({
                where: { id: child.id },
                relations: ['children', 'attachments', 'parent', 'bucket'],
                select: ['id', 'name', 'sequence', 'icon', 'color', 'parent', 'children', 'attachments'],
                order: { sequence: 'ASC' }
            });
            if (folder) {
                folder.children = await this.getChildrenHierarchy(folder.children);
            }
            return folder;
        }));
        return loadedChildren.filter(Boolean);
    }
    async getAttachment(path) {
        const url = await this.s3SourcesService.getSignedUrl(path);
        return url;
    }
    async getBucketsPaginated(data, options) {
        const { business_unit_id } = data;
        try {
            const businessUnit = await this.businessUnitService.getBusinessUnit(business_unit_id);
            if (options) {
                const queryBuilder = this.bucketRepository.createQueryBuilder('bucket_v1');
                queryBuilder.where('business_unit_id = :business_unit_id', { business_unit_id: businessUnit.id });
                return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, options);
            }
            return await this.bucketRepository.find();
        }
        catch (error) {
            throw error;
        }
    }
    async getBucketById(id) {
        try {
            const tmpBucket = await this.bucketRepository.findOne({
                relations: {
                    project: true,
                    historyQr: true
                },
                where: { id }
            });
            if (tmpBucket) {
                return tmpBucket;
            }
            throw new common_1.NotFoundException(`No se ha encontrado ningú́n bucket con el ID ${id}`);
        }
        catch (error) {
            throw error;
        }
    }
    async createBucket(bucketDto) {
        try {
            const tmpProject = await this.projectService.getProjectById(bucketDto.project_id);
            if (!tmpProject) {
                throw new common_1.NotFoundException(`No se ha encontrado ningún proyecto con el ID ${bucketDto.project_id}`);
            }
            if (!bucketDto.business_unit_id) {
                bucketDto.business_unit_id = (await this.businessUnitService.getBusinessUnit()).id;
            }
            const bucket = this.bucketRepository.create({ ...bucketDto, project: tmpProject });
            const bucketCreated = await this.bucketRepository.save(bucket);
            if (bucketDto.template_id) {
                await this.useTemplate(bucketDto.template_id, bucket.id);
            }
            return bucketCreated;
        }
        catch (error) {
            throw error;
        }
    }
    async createFolder(folderDto) {
        let sequence = 0;
        try {
            let parent = await this.folderRepository.findOne({
                where: { id: folderDto.parent_folder_id },
                relations: { children: true, bucket: true }
            });
            if (parent && parent.children && parent.children.length > 0) {
                sequence = Math.max(...parent.children.map(child => child.sequence || 0)) + 1;
            }
            if (!parent) {
                const tmpP = await this.getFolderHierarchy(folderDto.bucket_id);
                sequence = Math.max(...tmpP.map(child => child.sequence || 0)) + 1;
            }
            const tmpFolder = this.folderRepository.create({ ...folderDto, parent_folder_id: parent?.id, sequence });
            return await this.folderRepository.save(tmpFolder);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updateFolder(folderId, folderDto) {
        try {
            const folder = await this.folderRepository.preload({
                id: folderId,
                ...folderDto
            });
            if (!folder) {
                throw new common_1.NotFoundException(`No se encontró ninguna carpeta con el ID ${folderId}`);
            }
            return await this.folderRepository.save(folder);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async createAttachment(attachmentDto, file) {
        let tmpPath = (0, uuid_1.v4)();
        try {
            const fileExtension = path.extname(file.originalname);
            tmpPath = `${tmpPath}${fileExtension}`;
            const tmpBucket = await this.bucketRepository.findOne({
                where: { id: attachmentDto.bucket_id }
            });
            if (!tmpBucket) {
                throw new common_1.NotFoundException(`No se ha encontrado ninguna bucket con el ID ${attachmentDto.bucket_id}`);
            }
            await this.s3SourcesService.uploadFile(tmpPath, file);
            const tmpAttachmentData = {
                bucket: tmpBucket,
                fileName: file.originalname,
                filePath: tmpPath,
                fileType: file.mimetype,
                fileSize: file.size,
            };
            if (attachmentDto.parent_id) {
                tmpAttachmentData.folder_id = attachmentDto.parent_id;
            }
            const tmpAttachment = this.attachmentRepository.create(tmpAttachmentData);
            return await this.attachmentRepository.save(tmpAttachment);
        }
        catch (error) {
            throw error;
        }
    }
    async useTemplate(template_id, bucket_id) {
        try {
            const tmpTemplate = await this.templateService.getTemplateById(template_id);
            if (!tmpTemplate) {
                console.log("no existe el template");
            }
            console.log(tmpTemplate.config);
            await this.createFolderFromTemplate(tmpTemplate.config, bucket_id);
        }
        catch (error) {
            throw error;
        }
    }
    async createFolderFromTemplate(data, bucket_id, parent_folder_id, sequence = 0) {
        for (const t of data) {
            const tmpFolder = this.folderRepository.create({
                name: t.text,
                bucket_id,
                parent_folder_id: parent_folder_id || null,
                description: t.description || '',
                sequence: sequence,
                icon: t.icon || '',
                color: t.color || '',
            });
            const folderCreated = await this.folderRepository.save(tmpFolder);
            if (t.children) {
                await this.createFolderFromTemplate(t.children, bucket_id, folderCreated.id, 0);
            }
            sequence++;
        }
    }
};
exports.RecursosService = RecursosService;
exports.RecursosService = RecursosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(folder_entity_1.Folder)),
    __param(1, (0, typeorm_1.InjectRepository)(bucket_entity_1.Bucket)),
    __param(2, (0, typeorm_1.InjectRepository)(attachments_entity_1.Attachment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        business_unit_service_1.BusinessUnitService,
        s3_sources_service_1.S3SourcesService,
        projects_service_1.ProjectsService,
        template_service_1.TemplateService])
], RecursosService);
//# sourceMappingURL=recursos.service.js.map