import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AdminHistoryDto } from './dto/adminHistory.dto';
import { BusinessUnitService } from 'src/business_unit/business_unit.service';
import { VisitBusinessUnitDto } from 'src/business_unit/dto/visitBusinessUnit.dto';
import { BusinessUnit } from 'src/business_unit/entity/businessUnit.entity';
import { QrHistoryDto } from './dto/qrHistory.dto';
import { VisitanteService } from 'src/visitante/visitante.service';
import { QrVisitDto } from 'src/visitante/dto/QrVisit.dto';


const whitelist = ["settings-app", "auth"];

@Injectable()
export class EventsService {

    constructor(
        private businessUnitService: BusinessUnitService,
        private qrVisitService: VisitanteService
    ) { }

    @OnEvent('admin.history.find')
    async handleVisitFind(data: AdminHistoryDto) {
        const lowerCaseUrl = data.url.toLowerCase();

        // Recorre el array de whitelist y verifica si alguna palabra está incluida en la URL
        const aa = whitelist.some(word => lowerCaseUrl.includes(word.toLowerCase()));

        const businessUnitId = aa ? null : await this.setBusinessUnit(data.params)

        const newVisit: VisitBusinessUnitDto = {
            business_unit_id: businessUnitId,
            user_id: data.user.userId,
            routePath: data.url,
            action: data.method,
            access_date: new Date()
        }

        await this.businessUnitService.createHistoryVisit(newVisit)
    }

    @OnEvent('admin.history.created')
    async handleVisitCreated(data: AdminHistoryDto) {
        const lowerCaseUrl = data.url.toLowerCase();

        // Recorre el array de whitelist y verifica si alguna palabra está incluida en la URL
        const aa = whitelist.some(word => lowerCaseUrl.includes(word.toLowerCase()));

        const businessUnitId = aa ? null : await this.setBusinessUnit(data.params)

        const newVisit: VisitBusinessUnitDto = {
            business_unit_id: businessUnitId,
            user_id: data.user.userId,
            routePath: data.url,
            action: data.method,
            access_date: new Date()
        }

        await this.businessUnitService.createHistoryVisit(newVisit)
    }

    @OnEvent('admin.history.updated')
    async handleVisitUpdated(data: AdminHistoryDto) {
        const lowerCaseUrl = data.url.toLowerCase();

        // Recorre el array de whitelist y verifica si alguna palabra está incluida en la URL
        const aa = whitelist.some(word => lowerCaseUrl.includes(word.toLowerCase()));

        const businessUnitId = aa ? null : await this.setBusinessUnit(data.params)

        const newVisit: VisitBusinessUnitDto = {
            business_unit_id: businessUnitId,
            user_id: data.user.userId,
            routePath: data.url,
            action: data.method,
            access_date: new Date()
        }

        await this.businessUnitService.createHistoryVisit(newVisit)
    }

    @OnEvent('visiter.history.find')
    async handleQRVisitFind(data: QrHistoryDto): Promise<void> {

        const newVisit: QrVisitDto = {
            bucket_id: data.bucketId,
            dateConsult: new Date(),
            routePath: data.url,
            visitante_id: data.user.userId,
            latitud: data.latitud,
            longitud: data.longitud
        }
        

        await this.qrVisitService.createQrHistoryVisit(newVisit)
    }


    async setBusinessUnit(params: any): Promise<string> {
        let tmpResponse: BusinessUnit

        if (params && params.businessUnit)
            tmpResponse = await this.businessUnitService.getBusinessUnit(params.businessUnit)
        else
            tmpResponse = await this.businessUnitService.getBusinessUnit()
        return tmpResponse.id
    }

}
