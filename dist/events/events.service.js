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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const adminHistory_dto_1 = require("./dto/adminHistory.dto");
const business_unit_service_1 = require("../business_unit/business_unit.service");
const qrHistory_dto_1 = require("./dto/qrHistory.dto");
const visitante_service_1 = require("../visitante/visitante.service");
const whitelist = ["settings-app", "auth"];
let EventsService = class EventsService {
    constructor(businessUnitService, qrVisitService) {
        this.businessUnitService = businessUnitService;
        this.qrVisitService = qrVisitService;
    }
    async handleVisitFind(data) {
        const lowerCaseUrl = data.url.toLowerCase();
        const aa = whitelist.some(word => lowerCaseUrl.includes(word.toLowerCase()));
        const businessUnitId = aa ? null : await this.setBusinessUnit(data.params);
        const newVisit = {
            business_unit_id: businessUnitId,
            user_id: data.user.userId,
            routePath: data.url,
            action: data.method,
            access_date: new Date()
        };
        await this.businessUnitService.createHistoryVisit(newVisit);
    }
    async handleVisitCreated(data) {
        const lowerCaseUrl = data.url.toLowerCase();
        const aa = whitelist.some(word => lowerCaseUrl.includes(word.toLowerCase()));
        const businessUnitId = aa ? null : await this.setBusinessUnit(data.params);
        const newVisit = {
            business_unit_id: businessUnitId,
            user_id: data.user.userId,
            routePath: data.url,
            action: data.method,
            access_date: new Date()
        };
        await this.businessUnitService.createHistoryVisit(newVisit);
    }
    async handleVisitUpdated(data) {
        const lowerCaseUrl = data.url.toLowerCase();
        const aa = whitelist.some(word => lowerCaseUrl.includes(word.toLowerCase()));
        const businessUnitId = aa ? null : await this.setBusinessUnit(data.params);
        const newVisit = {
            business_unit_id: businessUnitId,
            user_id: data.user.userId,
            routePath: data.url,
            action: data.method,
            access_date: new Date()
        };
        await this.businessUnitService.createHistoryVisit(newVisit);
    }
    async handleQRVisitFind(data) {
        const newVisit = {
            bucket_id: data.bucketId,
            dateConsult: new Date(),
            routePath: data.url,
            visitante_id: data.user.userId,
            latitud: data.latitud,
            longitud: data.longitud
        };
        await this.qrVisitService.createQrHistoryVisit(newVisit);
    }
    async setBusinessUnit(params) {
        let tmpResponse;
        if (params && params.businessUnit)
            tmpResponse = await this.businessUnitService.getBusinessUnit(params.businessUnit);
        else
            tmpResponse = await this.businessUnitService.getBusinessUnit();
        return tmpResponse.id;
    }
};
exports.EventsService = EventsService;
__decorate([
    (0, event_emitter_1.OnEvent)('admin.history.find'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminHistory_dto_1.AdminHistoryDto]),
    __metadata("design:returntype", Promise)
], EventsService.prototype, "handleVisitFind", null);
__decorate([
    (0, event_emitter_1.OnEvent)('admin.history.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminHistory_dto_1.AdminHistoryDto]),
    __metadata("design:returntype", Promise)
], EventsService.prototype, "handleVisitCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('admin.history.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminHistory_dto_1.AdminHistoryDto]),
    __metadata("design:returntype", Promise)
], EventsService.prototype, "handleVisitUpdated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('visiter.history.find'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qrHistory_dto_1.QrHistoryDto]),
    __metadata("design:returntype", Promise)
], EventsService.prototype, "handleQRVisitFind", null);
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [business_unit_service_1.BusinessUnitService,
        visitante_service_1.VisitanteService])
], EventsService);
//# sourceMappingURL=events.service.js.map