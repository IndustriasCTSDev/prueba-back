import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CredentialDto } from "src/auth/dto/credentials.dto";

@ApiExtraModels()
export class CreatedSimpleUserDto {

    @ApiProperty({
        description: 'Datos de las credenciales del usuario',
    })
    @ValidateNested() // Valida las propiedades del DTO anidado
    @Type(() => CredentialDto) // Necesario para que `class-transformer` sepa cómo transformar la clase
    credentials: CredentialDto;

    @ApiProperty({
        description: 'Nombre del usuario',
    })
    name: string

}