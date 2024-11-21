import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";


@ApiExtraModels()
export class BusinessUnitDto {

    @ApiProperty()
    name: string

    @ApiProperty({
        description: 'admin id',
        examples: [1, 'null']
    })
    admin_id?: number 
}