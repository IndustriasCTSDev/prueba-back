import { StatusProject } from "./statusProject.entity";
import { Bucket } from "../../recursos/entity/bucket.entity";
import { Management } from "./management.entity";
export declare class Project {
    id?: string;
    name: string;
    cliente: string;
    status: StatusProject;
    status_project_id: number;
    warranty: string;
    description: string;
    managements: Management[];
    old_ga: string;
    buckets: Bucket[];
    created_at: Date;
    updated_at: Date;
}
