import { ApiProperty } from "@nestjs/swagger";

export class ProjectDto {

    @ApiProperty()
    name: string

    @ApiProperty()
    cliente: string

    @ApiProperty()
    status_project_id: number

    @ApiProperty()
    warranty?: string

    @ApiProperty()
    description?: string

    @ApiProperty()
    management?: string[]

    @ApiProperty()
    ubication_id?: number
}