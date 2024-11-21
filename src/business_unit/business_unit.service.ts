import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessUnit } from './entity/businessUnit.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { BusinessUnitDto } from './dto/business_unit.dto';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entity/users.entity';
import { VisitBusinessUnitDto } from './dto/visitBusinessUnit.dto';
import { VisitBusinessUnit } from './entity/visitBusinessUnit.entity';

@Injectable()
export class BusinessUnitService {
    constructor(
        @InjectRepository(BusinessUnit)
        private businessUnitRepository: Repository<BusinessUnit>,
        @InjectRepository(VisitBusinessUnit)
        private visitBusinessUnitRepository: Repository<VisitBusinessUnit>,
        private userService: UsersService
    ) {

    }

    async getBusinessUnits(): Promise<BusinessUnit[]> {
        return await this.businessUnitRepository.find()
    }

    async getBusinessUnit(id?: string): Promise<BusinessUnit> {

        const options: FindOneOptions<BusinessUnit> = {
            relations: {
                buckets: true,
                admin: true,
                history: {
                    user: true
                }
            },
        }

        if (id) {
            options.where = { id }
        } else {
            options.where = { name: 'proyectos' }
        }

        const businessUnit = await this.businessUnitRepository.findOne(options)

        if (!businessUnit) {
            throw new NotFoundException(`No se ha encontrado ninguna unidad de negocio con el ID ${id}`)
        }
        return businessUnit
    }

    async createBusinessUnit(businessUnit: BusinessUnitDto): Promise<BusinessUnit> {
        let { admin_id, name } = businessUnit
        let admin: Users = null;
        try {
            if (admin_id) {
                admin = await this.userService.findById(admin_id)
            }

            const newBusinessUnit = this.businessUnitRepository.create({
                name,
                admin,
                buckets: []
            })

            return await this.businessUnitRepository.save(newBusinessUnit)

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async updateBusinessUnit(id: string, businessUnit: BusinessUnitDto) {
        try {
            const newBusinessUnit = await this.businessUnitRepository.findOne({ where: { id } })
            newBusinessUnit.name = businessUnit.name
            newBusinessUnit.admin = await this.userService.findById(businessUnit.admin_id)
            return await this.businessUnitRepository.save(newBusinessUnit)
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    /**
     * Historial de visitas
     */

    async createHistoryVisit(data: VisitBusinessUnitDto): Promise<void> {
        try {
            const newVisit = this.visitBusinessUnitRepository.create({
                ...data
            })

            await this.visitBusinessUnitRepository.save(newVisit)
        } catch (error) {
            throw error
        }
    }

}
