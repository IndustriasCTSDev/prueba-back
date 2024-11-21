import { ChildrenDto } from "../dto/template.dto";
export declare class TemplateEntity {
    id: number;
    name: string;
    config: ChildrenDto[];
    created_at: Date;
    updated_at: Date;
}
