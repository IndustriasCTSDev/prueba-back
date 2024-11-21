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
exports.BusinessUnitController = void 0;
const common_1 = require("@nestjs/common");
const business_unit_service_1 = require("./business_unit.service");
const business_unit_dto_1 = require("./dto/business_unit.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const events_interceptor_1 = require("../common/interceptor/events.interceptor");
let BusinessUnitController = class BusinessUnitController {
    constructor(businessUnitService) {
        this.businessUnitService = businessUnitService;
    }
    async getBusinessUnits() {
        return await this.businessUnitService.getBusinessUnits();
    }
    async getBusinessUnit(id) {
        return this.businessUnitService.getBusinessUnit(id);
    }
    async createBusinessUnit(businessUnit) {
        return await this.businessUnitService.createBusinessUnit(businessUnit);
    }
    async updateBusinessUnit(id, businessUnit) {
        return await this.businessUnitService.updateBusinessUnit(id, businessUnit);
    }
};
exports.BusinessUnitController = BusinessUnitController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BusinessUnitController.prototype, "getBusinessUnits", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessUnitController.prototype, "getBusinessUnit", null);
__decorate([
    (0, common_1.Post)('new'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [business_unit_dto_1.BusinessUnitDto]),
    __metadata("design:returntype", Promise)
], BusinessUnitController.prototype, "createBusinessUnit", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, business_unit_dto_1.BusinessUnitDto]),
    __metadata("design:returntype", Promise)
], BusinessUnitController.prototype, "updateBusinessUnit", null);
exports.BusinessUnitController = BusinessUnitController = __decorate([
    (0, swagger_1.ApiTags)('Unidades de negocio'),
    (0, common_1.Controller)('business-unit'),
    (0, common_1.UseInterceptors)(events_interceptor_1.EventsInterceptor),
    __metadata("design:paramtypes", [business_unit_service_1.BusinessUnitService])
], BusinessUnitController);
//# sourceMappingURL=business_unit.controller.js.map