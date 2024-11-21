import { ApiProperty } from "@nestjs/swagger";
export class UserSessionDto {

    /**
     * Identificador unico del usuario
     */
    @ApiProperty({
        description: 'Identificador unico del usuario',
        example: 1
    })
    userId: number;

    /**
     * Nombre del usuario
     */
    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Pepe Perez'
    })
    username: string;

    /**
     * Rol del usuario
     */
    @ApiProperty({
        description: 'Rol del usuario',
        example: 'admin'
    })
    rol: string
}
