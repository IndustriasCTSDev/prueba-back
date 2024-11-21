import { ApiProperty } from "@nestjs/swagger";

export class BucketDto {

    @ApiProperty()
    name: string

    @ApiProperty()
    description?: string

    @ApiProperty()
    business_unit_id?: string

    @ApiProperty()
    project_id: string

    @ApiProperty()
    template_id?: number
}