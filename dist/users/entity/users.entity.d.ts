import { BusinessUnit } from "src/business_unit/entity/businessUnit.entity";
import { VisitBusinessUnit } from "src/business_unit/entity/visitBusinessUnit.entity";
import { Credentials } from "src/credential/entity/credential.entity";
import { Roles } from "src/roles/entity/roles.entity";
export declare class Users {
    id: number;
    name: string;
    credential?: Credentials;
    rol?: Roles;
    business_unit?: BusinessUnit;
    history?: VisitBusinessUnit[];
    created_at: Date;
    updated_at: Date;
}
