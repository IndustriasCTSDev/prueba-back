import { TemplateEntity } from './entity/template.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { TemplateDto } from './dto/template.dto';
export declare class TemplateService {
    private templateRepository;
    constructor(templateRepository: Repository<TemplateEntity>);
    getTemplates(options?: IPaginationOptions): Promise<Pagination<TemplateEntity> | TemplateEntity[]>;
    getTemplateById(id: number): Promise<TemplateEntity>;
    createTemplate(templateDto: TemplateDto): Promise<TemplateEntity>;
    updateTemplate(id: number, templateDto: TemplateDto): Promise<TemplateEntity>;
}
