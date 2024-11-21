import { Users } from "src/users/entity/users.entity";
export declare class RefreshToken {
    id: string;
    jwt: string;
    user: Users;
    exp: Date;
    created_at: Date;
    updated_at: Date;
}
