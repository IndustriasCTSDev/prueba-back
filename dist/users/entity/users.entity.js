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
exports.Users = void 0;
const businessUnit_entity_1 = require("../../business_unit/entity/businessUnit.entity");
const visitBusinessUnit_entity_1 = require("../../business_unit/entity/visitBusinessUnit.entity");
const credential_entity_1 = require("../../credential/entity/credential.entity");
const roles_entity_1 = require("../../roles/entity/roles.entity");
const typeorm_1 = require("typeorm");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => credential_entity_1.Credentials),
    (0, typeorm_1.JoinColumn)({ name: 'credential_id' }),
    __metadata("design:type", credential_entity_1.Credentials)
], Users.prototype, "credential", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => roles_entity_1.Roles),
    (0, typeorm_1.JoinColumn)({ name: 'rol_id' }),
    __metadata("design:type", roles_entity_1.Roles)
], Users.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => businessUnit_entity_1.BusinessUnit, businessUnit => businessUnit.admin),
    __metadata("design:type", businessUnit_entity_1.BusinessUnit)
], Users.prototype, "business_unit", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visitBusinessUnit_entity_1.VisitBusinessUnit, visitBusinessUnit => visitBusinessUnit.user),
    __metadata("design:type", Array)
], Users.prototype, "history", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Users.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Users.prototype, "updated_at", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users_v1'
    })
], Users);
//# sourceMappingURL=users.entity.js.map