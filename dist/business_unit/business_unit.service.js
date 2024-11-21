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
exports.BusinessUnitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const businessUnit_entity_1 = require("./entity/businessUnit.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const visitBusinessUnit_entity_1 = require("./entity/visitBusinessUnit.entity");
let BusinessUnitService = class BusinessUnitService {
    constructor(businessUnitRepository, visitBusinessUnitRepository, userService) {
        this.businessUnitRepository = businessUnitRepository;
        this.visitBusinessUnitRepository = visitBusinessUnitRepository;
        this.userService = userService;
    }
    async getBusinessUnits() {
        return await this.businessUnitRepository.find();
    }
    async getBusinessUnit(id) {
        const options = {
            relations: {
                buckets: true,
                admin: true,
                history: {
                    user: true
                }
            },
        };
        if (id) {
            options.where = { id };
        }
        else {
            options.where = { name: 'proyectos' };
        }
        const businessUnit = await this.businessUnitRepository.findOne(options);
        if (!businessUnit) {
            throw new common_1.NotFoundException(`No se ha encontrado ninguna unidad de negocio con el ID ${id}`);
        }
        return businessUnit;
    }
    async createBusinessUnit(businessUnit) {
        let { admin_id, name } = businessUnit;
        let admin = null;
        try {
            if (admin_id) {
                admin = await this.userService.findById(admin_id);
            }
            const newBusinessUnit = this.businessUnitRepository.create({
                name,
                admin,
                buckets: []
            });
            return await this.businessUnitRepository.save(newBusinessUnit);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updateBusinessUnit(id, businessUnit) {
        try {
            const newBusinessUnit = await this.businessUnitRepository.findOne({ where: { id } });
            newBusinessUnit.name = businessUnit.name;
            newBusinessUnit.admin = await this.userService.findById(businessUnit.admin_id);
            return await this.businessUnitRepository.save(newBusinessUnit);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async createHistoryVisit(data) {
        try {
            const newVisit = this.visitBusinessUnitRepository.create({
                ...data
            });
            await this.visitBusinessUnitRepository.save(newVisit);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.BusinessUnitService = BusinessUnitService;
exports.BusinessUnitService = BusinessUnitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(businessUnit_entity_1.BusinessUnit)),
    __param(1, (0, typeorm_1.InjectRepository)(visitBusinessUnit_entity_1.VisitBusinessUnit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], BusinessUnitService);
//# sourceMappingURL=business_unit.service.js.map