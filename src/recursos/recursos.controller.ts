import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RecursosService } from './recursos.service';
import { BucketDto } from './dto/bucket.dto';
import { BucketPaginatedDto } from './dto/bucketPaginated.dto';
import { EventsInterceptor } from 'src/common/interceptor/events.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { DualAuthGuard } from 'src/auth/guards/jwt-dual.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FolderDto } from './dto/folder.dto';
import { AttachmentDto } from './dto/attachment.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Recursos')
@Controller('recursos')
@UseInterceptors(EventsInterceptor)
export class RecursosController {

    constructor(private recursosService: RecursosService) { }

    @Get('general/:id')
    @UseGuards(DualAuthGuard)
    async getRecurso(
        @Param('id') id: string,
        @Query('businessUnit') businessUnit: string
    ) {
        return await this.recursosService.getFolderHierarchy(id, businessUnit);
    }

    /**
     * FOLDERS
     */
    @Post('folders')
    @UseGuards(JwtAuthGuard)
    async postFolders(@Body() data: FolderDto) {
        return await this.recursosService.createFolder(data);
    }

    @Put('folders/:id')
    @UseGuards(JwtAuthGuard)
    async putFolders(@Param('id') id: string, @Body() data: FolderDto) {
        return await this.recursosService.updateFolder(id, data);
    }

    /**
     * ATTACHMENTS
     */
    @Get('attachment/:path')
    @UseGuards(DualAuthGuard)
    async getAttachment(@Param('path') path: string) {
        return this.recursosService.getAttachment(path);
    }

    @Post('attachment')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async postAttachment(@Body() body: AttachmentDto, @UploadedFile() file: Express.Multer.File) {
        return await this.recursosService.createAttachment(body, file);
    }

    /**
     * BUCKETS
     */
    @Get('bucket')
    @UseGuards(JwtAuthGuard)
    async getBucketsPaginate(@Query() bucketData: BucketPaginatedDto) {

        return await this.recursosService.getBucketsPaginated(bucketData, {
            page: bucketData.page,
            limit: bucketData.limit
        })
    }

    @Get('bucket/:id')
    @UseGuards(JwtAuthGuard)
    async getBucketById(@Param('id') id: string) {
        return await this.recursosService.getBucketById(id)
    }

    @Post('bucket')
    @UseGuards(JwtAuthGuard)
    async createBucket(@Body() bucketData: BucketDto) {
        return await this.recursosService.createBucket(bucketData)
    }
}
