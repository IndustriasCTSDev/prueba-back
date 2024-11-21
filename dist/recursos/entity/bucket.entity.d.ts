import { BusinessUnit } from "src/business_unit/entity/businessUnit.entity";
import { Project } from "../../projects/entity/project.entity";
import { Folder } from "./folder.entity";
import { Attachment } from "./attachments.entity";
import { QrVisit } from "src/visitante/entity/qrVisit.entity";
export declare class Bucket {
    id?: string;
    name: string;
    description: string;
    business_unit: BusinessUnit;
    business_unit_id: string;
    project: Project;
    project_id: string;
    folders: Folder[];
    attachments: Attachment[];
    historyQr: QrVisit[];
    created_at: Date;
    updated_at: Date;
}
