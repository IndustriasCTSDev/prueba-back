import { Users } from "src/users/entity/users.entity";
import { BusinessUnit } from "./businessUnit.entity";
export declare class VisitBusinessUnit {
    id?: string;
    user?: Users;
    user_id: string;
    business_unit?: BusinessUnit;
    business_unit_id?: string;
    access_date: Date;
    routePath: string;
    action: string;
    created_at?: Date;
    updated_at?: Date;
}
