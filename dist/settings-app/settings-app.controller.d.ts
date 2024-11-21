import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SettingsAppService } from './settings-app.service';
import { TemplateDto } from 'src/template/dto/template.dto';
import { TemplateService } from 'src/template/template.service';
import { Users } from 'src/users/entity/users.entity';
export declare class SettingsAppController {
    private settingsAppService;
    private templateService;
    constructor(settingsAppService: SettingsAppService, templateService: TemplateService);
    getTemplates(query: PaginationDto): Promise<Pagination<import("../template/entity/template.entity").TemplateEntity, import("nestjs-typeorm-paginate").IPaginationMeta> | import("../template/entity/template.entity").TemplateEntity[]>;
    getTemplateById(id: number): Promise<import("../template/entity/template.entity").TemplateEntity>;
    createTemplate(templateDto: TemplateDto): Promise<import("../template/entity/template.entity").TemplateEntity>;
    updateTemplate(id: number, templateDto: TemplateDto): Promise<import("../template/entity/template.entity").TemplateEntity>;
    getAdmins(query: PaginationDto): Promise<Pagination<Users> | Users[]>;
}
