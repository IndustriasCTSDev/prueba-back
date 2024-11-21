import { ApiProperty } from "@nestjs/swagger";
import { CredentialDto } from "src/auth/dto/credentials.dto";

export class UserDto {

    @ApiProperty()
    name: string

    @ApiProperty()
    credential?: CredentialDto

    @ApiProperty()
    rol?: {
        id: number,
        name: string
    }
}