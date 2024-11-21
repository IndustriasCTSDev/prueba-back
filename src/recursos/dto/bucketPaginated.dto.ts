import { ApiProperty } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";

export class BucketPaginatedDto extends PaginationDto {
    @ApiProperty()
    business_unit_id?: string

}