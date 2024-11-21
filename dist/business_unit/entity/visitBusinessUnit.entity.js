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
exports.VisitBusinessUnit = void 0;
const users_entity_1 = require("../../users/entity/users.entity");
const typeorm_1 = require("typeorm");
const businessUnit_entity_1 = require("./businessUnit.entity");
let VisitBusinessUnit = class VisitBusinessUnit {
};
exports.VisitBusinessUnit = VisitBusinessUnit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VisitBusinessUnit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, users => users.history),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_entity_1.Users)
], VisitBusinessUnit.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VisitBusinessUnit.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => businessUnit_entity_1.BusinessUnit, businessUnit => businessUnit.history),
    (0, typeorm_1.JoinColumn)({ name: 'business_unit_id' }),
    __metadata("design:type", businessUnit_entity_1.BusinessUnit)
], VisitBusinessUnit.prototype, "business_unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VisitBusinessUnit.prototype, "business_unit_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], VisitBusinessUnit.prototype, "access_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        name: 'route_path'
    }),
    __metadata("design:type", String)
], VisitBusinessUnit.prototype, "routePath", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VisitBusinessUnit.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], VisitBusinessUnit.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], VisitBusinessUnit.prototype, "updated_at", void 0);
exports.VisitBusinessUnit = VisitBusinessUnit = __decorate([
    (0, typeorm_1.Entity)({
        name: 'visit_business_unit_v1'
    })
], VisitBusinessUnit);
//# sourceMappingURL=visitBusinessUnit.entity.js.map