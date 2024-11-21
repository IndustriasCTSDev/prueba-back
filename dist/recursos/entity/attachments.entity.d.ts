import { Bucket } from "./bucket.entity";
import { Folder } from "./folder.entity";
export declare class Attachment {
    id?: number;
    fileName: string;
    filePath: string;
    fileSize: number;
    fileType: string;
    bucket: Bucket;
    bucket_id: string;
    folder: Folder;
    folder_id: string;
    url?: string;
    created_at: Date;
    updated_at: Date;
}
