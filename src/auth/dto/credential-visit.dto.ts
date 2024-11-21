import { ApiExtraModels, ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer";
import { IsEmail, IsOptional } from "class-validator";

@ApiExtraModels()
export class CredentialVisitDto {
    @ApiProperty({
        title: 'correo electronico del visitante',
    })
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    email: string;

    @ApiProperty({
        title: 'Nombre Visitante',
        description: 'Nombre del visitante asociado al email',
        default: '1095802996'
    })
    @IsOptional()
    name?: string

    @ApiProperty({
        title: 'Nombre de la empresa visitante',
        description: 'Nombre de la empresa (opcional)',
    })
    @IsOptional()
    empresa?: string

    @ApiProperty({
        title: 'NIT del visitante',
        description: 'NIT del visitante (opcional)',
    })
    @IsOptional()
    nit?: string

    @ApiProperty({
        title: 'telefono del visitante',
        description: 'telefono del visitante (opcional)',
    })
    @IsOptional()
    telefono?: string

}