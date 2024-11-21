import { Folder } from './entity/folder.entity';
import { Repository } from 'typeorm';
import { Bucket } from './entity/bucket.entity';
import { BusinessUnitService } from 'src/business_unit/business_unit.service';
import { S3SourcesService } from 'src/s3-sources/s3-sources.service';
import { ProjectsService } from 'src/projects/projects.service';
import { BucketDto } from './dto/bucket.dto';
import { BucketPaginatedDto } from './dto/bucketPaginated.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FolderDto } from './dto/folder.dto';
import { AttachmentDto } from './dto/attachment.dto';
import { Attachment } from './entity/attachments.entity';
import { TemplateService } from 'src/template/template.service';
import { ChildrenDto } from 'src/template/dto/template.dto';
export declare class RecursosService {
    private folderRepository;
    private readonly bucketRepository;
    private readonly attachmentRepository;
    private readonly businessUnitService;
    private readonly s3SourcesService;
    private projectService;
    private templateService;
    constructor(folderRepository: Repository<Folder>, bucketRepository: Repository<Bucket>, attachmentRepository: Repository<Attachment>, businessUnitService: BusinessUnitService, s3SourcesService: S3SourcesService, projectService: ProjectsService, templateService: TemplateService);
    getFolderHierarchy(id: string, business_unit_id?: string): Promise<Folder | Array<Folder>>;
    getBucketByProjectAndBusinessUnit(project_id: string, business_unit_id: string): Promise<Bucket>;
    private getParentHierarchy;
    private getChildrenHierarchy;
    getAttachment(path: string): Promise<any>;
    getBucketsPaginated(data: BucketPaginatedDto, options: IPaginationOptions): Promise<Pagination<Bucket> | Bucket[]>;
    getBucketById(id: string): Promise<Bucket>;
    createBucket(bucketDto: BucketDto): Promise<Bucket>;
    createFolder(folderDto: FolderDto): Promise<Folder>;
    updateFolder(folderId: string, folderDto: FolderDto): Promise<Folder>;
    createAttachment(attachmentDto: AttachmentDto, file: Express.Multer.File): Promise<Attachment>;
    useTemplate(template_id: number, bucket_id: string): Promise<void>;
    createFolderFromTemplate(data: ChildrenDto[], bucket_id: string, parent_folder_id?: string, sequence?: number): Promise<void>;
}