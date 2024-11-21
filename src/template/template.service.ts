import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from './entity/template.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TemplateDto } from './dto/template.dto';

@Injectable()
export class TemplateService {

    constructor(
        @InjectRepository(TemplateEntity)
        private templateRepository: Repository<TemplateEntity>,
    ) { }

    async getTemplates(options?: IPaginationOptions): Promise<Pagination<TemplateEntity> | TemplateEntity[]> {
        try {

            if (options) {

                const queryBuilder = this.templateRepository.createQueryBuilder('template_v1')


                return paginate<TemplateEntity>(queryBuilder, options)
            }

            return await this.templateRepository.find()
        } catch (error) {
            throw error
        }
    }

    async getTemplateById(id: number): Promise<TemplateEntity> {
        return await this.templateRepository.findOneBy({ id });
    }

    async createTemplate(templateDto: TemplateDto): Promise<TemplateEntity> {
        try {
            // Crear una instancia de TemplateEntity y asignar directamente los valores de templateDto
            const newTemplate = this.templateRepository.create({
                name: templateDto.name,
                config: templateDto.config, // `typeorm` maneja la conversión a JSON automáticamente
            });

            // Guardar la nueva plantilla en la base de datos
            const savedTemplate = await this.templateRepository.save(newTemplate);

            return savedTemplate;
        } catch (error) {
            console.log(error);

            // Lanzar un error detallado en caso de fallo
            throw new Error(`Error creating template: ${error.message}`);
        }
    }

    async updateTemplate(id: number, templateDto: TemplateDto): Promise<TemplateEntity> {
        try {
            // Buscar la entidad por su ID
            const template = await this.templateRepository.findOneBy({ id });

            if (!template) {
                throw new NotFoundException(`Template with ID ${id} not found`);
            }

            // Actualizar los campos con los datos de templateDto
            template.name = templateDto.name;
            template.config = templateDto.config;

            // Guardar los cambios en la base de datos
            const updatedTemplate = await this.templateRepository.save(template);

            return updatedTemplate;
        } catch (error) {
            console.log(error);
            throw new Error(`Error updating template with ID ${id}: ${error.message}`);
        }
    }

}
