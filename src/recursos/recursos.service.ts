import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entity/folder.entity';
import { DeepPartial, FindManyOptions, IsNull, Repository } from 'typeorm';
import { Bucket } from './entity/bucket.entity';
import { BusinessUnitService } from 'src/business_unit/business_unit.service';
import { S3SourcesService } from 'src/s3-sources/s3-sources.service';
import { ProjectsService } from 'src/projects/projects.service';
import { BucketDto } from './dto/bucket.dto';
import { BucketPaginatedDto } from './dto/bucketPaginated.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FolderDto } from './dto/folder.dto';
import { AttachmentDto } from './dto/attachment.dto';
import { Attachment } from './entity/attachments.entity';
import { v4 as uuidv4 } from 'uuid'
import * as path from "path";
import { TemplateService } from 'src/template/template.service';
import { ChildrenDto } from 'src/template/dto/template.dto';

@Injectable()
export class RecursosService {

    constructor(
        @InjectRepository(Folder)
        private folderRepository: Repository<Folder>,
        @InjectRepository(Bucket)
        private readonly bucketRepository: Repository<Bucket>,
        @InjectRepository(Attachment)
        private readonly attachmentRepository: Repository<Attachment>,
        private readonly businessUnitService: BusinessUnitService,
        private readonly s3SourcesService: S3SourcesService,
        private projectService: ProjectsService,
        private templateService: TemplateService
    ) { }


    /**
     * RECURSOS VISITANTE
    */

    // Obtener carpeta con jerarquía completa de padres e hijos
    async getFolderHierarchy(id: string, business_unit_id?: string): Promise<Folder | Array<Folder>> {

        // Intenta cargar la carpeta con el ID proporcionado
        const businessUnit = await this.businessUnitService.getBusinessUnit(business_unit_id);

        const bucket = await this.getBucketByProjectAndBusinessUnit(id, businessUnit.id);

        if (bucket) {
            bucket.folders = await this.folderRepository.find({
                relations: { parent: true, bucket: true, attachments: true },
                select: ['id', 'name', 'sequence', 'icon', 'color', 'parent', 'children', 'attachments'],
                where: { bucket: { id: bucket.id }, parent: IsNull() },
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

        throw new NotFoundException(`No se econtró ningú́n recurso con el ID ${id}`);
    }

    async getBucketByProjectAndBusinessUnit(project_id: string, business_unit_id: string): Promise<Bucket> {

        const bucket = await this.bucketRepository.findOne({
            where: {
                id: project_id
            }
        })

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

    // // Obtener toda la jerarquía de padres
    private async getParentHierarchy(folder: Folder | null): Promise<Folder | null> {
        if (!folder) return null;

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

    // Obtener toda la jerarquía de hijos
    private async getChildrenHierarchy(children: Folder[]): Promise<Folder[]> {
        if (children.length === 0) return [];

        const loadedChildren = await Promise.all(
            children.map(async (child) => {
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
            }),
        );

        return loadedChildren.filter(Boolean) as Folder[];
    }

    async getAttachment(path: string): Promise<any> {
        const url = await this.s3SourcesService.getSignedUrl(path);
        return url;
    }

    /**
     * Buckets
     */

    async getBucketsPaginated(data: BucketPaginatedDto, options: IPaginationOptions): Promise<Pagination<Bucket> | Bucket[]> {
        const { business_unit_id } = data
        try {
            const businessUnit = await this.businessUnitService.getBusinessUnit(business_unit_id);

            if (options) {

                const queryBuilder = this.bucketRepository.createQueryBuilder('bucket_v1')

                queryBuilder.where('business_unit_id = :business_unit_id', { business_unit_id: businessUnit.id })

                return paginate<Bucket>(queryBuilder, options)
            }

            return await this.bucketRepository.find()
        } catch (error) {
            throw error
        }
    }

    async getBucketById(id: string): Promise<Bucket> {
        try {
            const tmpBucket = await this.bucketRepository.findOne({
                relations: {
                    project: true,
                    historyQr: true
                },
                where: { id }
            })

            if (tmpBucket) {
                return tmpBucket
            }

            throw new NotFoundException(`No se ha encontrado ningú́n bucket con el ID ${id}`)

        } catch (error) {
            throw error
        }
    }

    async createBucket(bucketDto: BucketDto): Promise<Bucket> {
        try {
            const tmpProject = await this.projectService.getProjectById(bucketDto.project_id)
            if (!tmpProject) {
                throw new NotFoundException(`No se ha encontrado ningún proyecto con el ID ${bucketDto.project_id}`)
            }

            if (!bucketDto.business_unit_id) {
                bucketDto.business_unit_id = (await this.businessUnitService.getBusinessUnit()).id
            }
            const bucket = this.bucketRepository.create({ ...bucketDto, project: tmpProject });

            const bucketCreated = await this.bucketRepository.save(bucket);

            if (bucketDto.template_id) {
                await this.useTemplate(bucketDto.template_id, bucket.id)
            }

            return bucketCreated
        } catch (error) {
            throw error
        }
    }

    async createFolder(folderDto: FolderDto): Promise<Folder> {
        let sequence = 0;
        try {
            let parent = await this.folderRepository.findOne({
                where: { id: folderDto.parent_folder_id },
                relations: { children: true, bucket: true }
            })

            if (parent && parent.children && parent.children.length > 0) {
                // Encuentra la secuencia más alta entre los hijos
                sequence = Math.max(...parent.children.map(child => child.sequence || 0)) + 1;
            }

            if (!parent) {
                const tmpP = await this.getFolderHierarchy(folderDto.bucket_id) as Folder[]
                sequence = Math.max(...tmpP.map(child => child.sequence || 0)) + 1;
            }

            const tmpFolder = this.folderRepository.create({ ...folderDto, parent_folder_id: parent?.id, sequence });

            return await this.folderRepository.save(tmpFolder);
        } catch (error) {
            console.log(error);

            throw error
        }
    }

    async updateFolder(folderId: string, folderDto: FolderDto): Promise<Folder> {
        try {
            const folder = await this.folderRepository.preload({
                id: folderId,
                ...folderDto
            });

            if (!folder) {
                throw new NotFoundException(`No se encontró ninguna carpeta con el ID ${folderId}`);
            }

            return await this.folderRepository.save(folder);
        } catch (error) {
            console.log(error);

            throw error
        }
    }

    /**
     * ATTACHMENTS
     */
    async createAttachment(attachmentDto: AttachmentDto, file: Express.Multer.File): Promise<Attachment> {
        let tmpPath = uuidv4()


        try {
            const fileExtension = path.extname(file.originalname);
            tmpPath = `${tmpPath}${fileExtension}`

            const tmpBucket = await this.bucketRepository.findOne({
                where: { id: attachmentDto.bucket_id }
            })

            if (!tmpBucket) {
                throw new NotFoundException(`No se ha encontrado ninguna bucket con el ID ${attachmentDto.bucket_id}`)
            }

            await this.s3SourcesService.uploadFile(tmpPath, file)

            const tmpAttachmentData: DeepPartial<Attachment> = {
                bucket: tmpBucket,
                fileName: file.originalname,
                filePath: tmpPath,
                fileType: file.mimetype,
                fileSize: file.size,
            }

            if (attachmentDto.parent_id) {
                tmpAttachmentData.folder_id = attachmentDto.parent_id
            }

            const tmpAttachment = this.attachmentRepository.create(tmpAttachmentData)



            return await this.attachmentRepository.save(tmpAttachment)
        } catch (error) {
            throw error
        }
    }


    async useTemplate(template_id: number, bucket_id: string): Promise<void> {
        try {
            const tmpTemplate = await this.templateService.getTemplateById(template_id)

            if (!tmpTemplate) {
                console.log("no existe el template");
            }

            console.log(tmpTemplate.config);
            
            await this.createFolderFromTemplate(tmpTemplate.config, bucket_id)

        } catch (error) {
            throw error
        }
    }

    async createFolderFromTemplate(data: ChildrenDto[], bucket_id: string, parent_folder_id?: string, sequence: number = 0): Promise<void> {
        for (const t of data) {
            // Creamos la carpeta con la secuencia actual
            const tmpFolder = this.folderRepository.create({
                name: t.text,
                bucket_id,
                parent_folder_id: parent_folder_id || null,
                description: t.description || '',
                sequence: sequence, // La secuencia empieza en 0
                icon: t.icon || '',
                color: t.color || '',
            });
    
            const folderCreated = await this.folderRepository.save(tmpFolder);
    
            if (t.children) {
                // Llamada recursiva para las carpetas hijas, reiniciamos la secuencia en 0 para cada grupo de hijos.
                await this.createFolderFromTemplate(t.children, bucket_id, folderCreated.id, 0);
            }
    
            // Incrementamos la secuencia para la próxima carpeta dentro del mismo nivel
            sequence++;
        }
    }
    

}
