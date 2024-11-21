import { Body, Controller, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessUnitService } from './business_unit.service';
import { BusinessUnitDto } from './dto/business_unit.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EventsInterceptor } from 'src/common/interceptor/events.interceptor';

@ApiTags('Unidades de negocio')
@Controller('business-unit')
@UseInterceptors(EventsInterceptor)
export class BusinessUnitController {

    constructor(private businessUnitService: BusinessUnitService) {}

    @Get()
    async getBusinessUnits() {
        return await this.businessUnitService.getBusinessUnits()
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getBusinessUnit(@Param('id') id: string) {
        return this.businessUnitService.getBusinessUnit(id);
    }

    @Post('new')
    @UseGuards(JwtAuthGuard)
    async createBusinessUnit(@Body() businessUnit: BusinessUnitDto) {
        return await this.businessUnitService.createBusinessUnit(businessUnit);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateBusinessUnit(@Param('id') id: string, @Body() businessUnit: BusinessUnitDto) {
        return await this.businessUnitService.updateBusinessUnit(id, businessUnit);
    }
}
