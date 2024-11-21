import { Bucket } from "src/recursos/entity/bucket.entity";
import { Users } from "src/users/entity/users.entity";
import { VisitBusinessUnit } from "./visitBusinessUnit.entity";
export declare class BusinessUnit {
    id?: string;
    name: string;
    admin?: Users;
    buckets?: Bucket[];
    history?: VisitBusinessUnit[];
    created_at?: Date;
    updated_at?: Date;
}
