import { AdminHistoryDto } from './dto/adminHistory.dto';
import { BusinessUnitService } from 'src/business_unit/business_unit.service';
import { QrHistoryDto } from './dto/qrHistory.dto';
import { VisitanteService } from 'src/visitante/visitante.service';
export declare class EventsService {
    private businessUnitService;
    private qrVisitService;
    constructor(businessUnitService: BusinessUnitService, qrVisitService: VisitanteService);
    handleVisitFind(data: AdminHistoryDto): Promise<void>;
    handleVisitCreated(data: AdminHistoryDto): Promise<void>;
    handleVisitUpdated(data: AdminHistoryDto): Promise<void>;
    handleQRVisitFind(data: QrHistoryDto): Promise<void>;
    setBusinessUnit(params: any): Promise<string>;
}
