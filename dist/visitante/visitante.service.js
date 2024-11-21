"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitanteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const visitante_entity_1 = require("./entity/visitante.entity");
const typeorm_2 = require("typeorm");
const dateutils_service_1 = require("../dateutils/dateutils.service");
const qrVisit_entity_1 = require("./entity/qrVisit.entity");
let VisitanteService = class VisitanteService {
    constructor(visitanteRepository, qrVisitRepository, dateService) {
        this.visitanteRepository = visitanteRepository;
        this.qrVisitRepository = qrVisitRepository;
        this.dateService = dateService;
    }
    async validateVisitante(email) {
        const visitante = await this.visitanteRepository.findOneBy({ email });
        return visitante;
    }
    async createVisitante(createVisitanteDto) {
        const visitante = this.visitanteRepository.create(createVisitanteDto);
        return await this.visitanteRepository.save(visitante);
    }
    async getVisitanteByOTP(otp) {
        const visitante = await this.visitanteRepository.findOneBy({ last_otp: otp });
        return visitante;
    }
    async updateLastOtp(visitante, otp) {
        visitante.last_otp = otp;
        return await this.visitanteRepository.save(visitante);
    }
    async updateLastAccess(visitante) {
        visitante.last_access = this.dateService.formatDateToColombia(new Date());
        return await this.visitanteRepository.save(visitante);
    }
    async createQrHistoryVisit(data) {
        try {
            const newVisit = this.qrVisitRepository.create({
                ...data
            });
            await this.qrVisitRepository.save(newVisit);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.VisitanteService = VisitanteService;
exports.VisitanteService = VisitanteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(visitante_entity_1.Visitante)),
    __param(1, (0, typeorm_1.InjectRepository)(qrVisit_entity_1.QrVisit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        dateutils_service_1.DateUtilsService])
], VisitanteService);
//# sourceMappingURL=visitante.service.js.map