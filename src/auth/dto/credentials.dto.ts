import { ApiExtraModels, ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

@ApiExtraModels()
export class CredentialDto {
    @ApiProperty({
        title: 'correo electronico',
        description: 'El correo electrónico asociado a las credenciales',
        default: 'auxiliar2@industriascts.com.co'
    })
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    email: string;

    @ApiProperty({
        title: 'Contraseña',
        description: 'La contraseña asociada a las credenciales',
        default: '1095802996'
    })
    @IsNotEmpty()
    password: string
}