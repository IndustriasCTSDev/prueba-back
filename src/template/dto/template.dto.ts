
import { ApiProperty } from "@nestjs/swagger";

export class ChildrenDto {
    @ApiProperty()
    icon: string;

    @ApiProperty()
    text: string;

    @ApiProperty()
    color: string;

    @ApiProperty({ type: () => [ChildrenDto] }) // Recursivo para permitir hijos anidados
    children: ChildrenDto[];

    @ApiProperty()
    description: string;
}

export class TemplateDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ type: () => [ChildrenDto] })
    config: ChildrenDto[];
}