import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitante } from './entity/visitante.entity';
import { Repository } from 'typeorm';
import { CredentialVisitDto } from 'src/auth/dto/credential-visit.dto';
import { DateUtilsService } from 'src/dateutils/dateutils.service';
import { QrVisitDto } from './dto/QrVisit.dto';
import { QrVisit } from './entity/qrVisit.entity';

@Injectable()
export class VisitanteService {

    constructor(
        @InjectRepository(Visitante)
        private visitanteRepository: Repository<Visitante>,
        @InjectRepository(QrVisit)
        private qrVisitRepository: Repository<QrVisit>,
        private dateService: DateUtilsService
    ) { }

    async validateVisitante(email: string) {
        const visitante = await this.visitanteRepository.findOneBy({ email })
        return visitante
    }

    async createVisitante(createVisitanteDto: CredentialVisitDto | Visitante): Promise<Visitante> {
        // Crear una instancia del visitante con los datos del DTO
        const visitante = this.visitanteRepository.create(createVisitanteDto);

        // Guardar el visitante en la base de datos
        return await this.visitanteRepository.save(visitante);
    }

    async getVisitanteByOTP(otp: number): Promise<Visitante> {
        const visitante = await this.visitanteRepository.findOneBy({ last_otp: otp })
        return visitante
    }


    async updateLastOtp(visitante: Visitante, otp: number): Promise<Visitante> {
        visitante.last_otp = otp
        return await this.visitanteRepository.save(visitante)
    }

    async updateLastAccess(visitante: Visitante): Promise<Visitante> {
        visitante.last_access = this.dateService.formatDateToColombia(new Date())
        return await this.visitanteRepository.save(visitante)
    }

    async createQrHistoryVisit(data: QrVisitDto): Promise<void> {
        try {
            const newVisit = this.qrVisitRepository.create({
                ...data
            })
            await this.qrVisitRepository.save(newVisit)
        } catch (error) {
            throw error
        }
    }
}
