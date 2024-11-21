import { CredentialDto } from "src/auth/dto/credentials.dto";
export declare class UserDto {
    name: string;
    credential?: CredentialDto;
    rol?: {
        id: number;
        name: string;
    };
}
