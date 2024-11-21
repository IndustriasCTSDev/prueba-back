import { RecursosService } from './recursos.service';
import { BucketDto } from './dto/bucket.dto';
import { BucketPaginatedDto } from './dto/bucketPaginated.dto';
import { FolderDto } from './dto/folder.dto';
import { AttachmentDto } from './dto/attachment.dto';
export declare class RecursosController {
    private recursosService;
    constructor(recursosService: RecursosService);
    getRecurso(id: string, businessUnit: string): Promise<import("./entity/folder.entity").Folder | import("./entity/folder.entity").Folder[]>;
    postFolders(data: FolderDto): Promise<import("./entity/folder.entity").Folder>;
    putFolders(id: string, data: FolderDto): Promise<import("./entity/folder.entity").Folder>;
    getAttachment(path: string): Promise<any>;
    postAttachment(body: AttachmentDto, file: Express.Multer.File): Promise<import("./entity/attachments.entity").Attachment>;
    getBucketsPaginate(bucketData: BucketPaginatedDto): Promise<import("./entity/bucket.entity").Bucket[] | import("nestjs-typeorm-paginate").Pagination<import("./entity/bucket.entity").Bucket, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getBucketById(id: string): Promise<import("./entity/bucket.entity").Bucket>;
    createBucket(bucketData: BucketDto): Promise<import("./entity/bucket.entity").Bucket>;
}
