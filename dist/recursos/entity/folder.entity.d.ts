import { Bucket } from "./bucket.entity";
import { Attachment } from "./attachments.entity";
export declare class Folder {
    id?: string;
    name: string;
    description?: string;
    parent?: Folder;
    parent_folder_id?: string;
    children?: Folder[];
    sequence?: number;
    icon?: string;
    color?: string;
    bucket_id: string;
    bucket?: Bucket;
    attachments?: Attachment[];
    created_at?: Date;
    updated_at?: Date;
}
