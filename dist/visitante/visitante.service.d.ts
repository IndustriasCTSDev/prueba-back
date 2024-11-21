import { Visitante } from './entity/visitante.entity';
import { Repository } from 'typeorm';
import { CredentialVisitDto } from 'src/auth/dto/credential-visit.dto';
import { DateUtilsService } from 'src/dateutils/dateutils.service';
import { QrVisitDto } from './dto/QrVisit.dto';
import { QrVisit } from './entity/qrVisit.entity';
export declare class VisitanteService {
    private visitanteRepository;
    private qrVisitRepository;
    private dateService;
    constructor(visitanteRepository: Repository<Visitante>, qrVisitRepository: Repository<QrVisit>, dateService: DateUtilsService);
    validateVisitante(email: string): Promise<Visitante>;
    createVisitante(createVisitanteDto: CredentialVisitDto | Visitante): Promise<Visitante>;
    getVisitanteByOTP(otp: number): Promise<Visitante>;
    updateLastOtp(visitante: Visitante, otp: number): Promise<Visitante>;
    updateLastAccess(visitante: Visitante): Promise<Visitante>;
    createQrHistoryVisit(data: QrVisitDto): Promise<void>;
}
