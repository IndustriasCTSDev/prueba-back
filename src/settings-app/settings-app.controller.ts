import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SettingsAppService } from './settings-app.service';
import { TemplateDto } from 'src/template/dto/template.dto';
import { TemplateService } from 'src/template/template.service';
import { Users } from 'src/users/entity/users.entity';
import { EventsInterceptor } from 'src/common/interceptor/events.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('settings-app')
@Controller('settings-app')
@UseInterceptors(EventsInterceptor)
export class SettingsAppController {

    constructor(
        private settingsAppService: SettingsAppService,
        private templateService: TemplateService
    ) { }

    /**
     * TEMPLATES
     */
    @Get('templates')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'The list of templates has been successfully retrieved.',
        type: Pagination
    })
    async getTemplates(@Query() query: PaginationDto) {
        return await this.templateService.getTemplates({ page: query.page, limit: query.limit })
    }

    @Get('templates/:id')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'The template has been successfully retrieved.',
        type: TemplateDto
    })
    async getTemplateById(@Param('id') id: number) {
        return await this.templateService.getTemplateById(id)
    }

    @Post('templates')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 201,
        description: 'The template has been successfully created.',
        type: TemplateDto
    })
    async createTemplate(@Body() templateDto: TemplateDto) {
        return await this.templateService.createTemplate(templateDto)
    }

    @Put('templates/:id')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'The template has been successfully updated.',
        type: TemplateDto
    })
    async updateTemplate(@Param('id') id: number, @Body() templateDto: TemplateDto) {
        return await this.templateService.updateTemplate(id, templateDto)
    }


    /**
     * ADMINS
     */
    @Get('admins')
    @ApiResponse({
        status: 200,
        description: 'The list of admins has been successfully retrieved.',
        type: Pagination
    })
    @UseGuards(JwtAuthGuard)
    async getAdmins(@Query() query: PaginationDto): Promise<Pagination<Users> | Users[]> {
        return await this.settingsAppService.getAdmins({ page: query.page, limit: query.limit })
    }
}

