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
exports.Credentials = void 0;
const typeorm_1 = require("typeorm");
let Credentials = class Credentials {
};
exports.Credentials = Credentials;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Credentials.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Credentials.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean'
    }),
    __metadata("design:type", Boolean)
], Credentials.prototype, "email_verified", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Credentials.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Credentials.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Credentials.prototype, "updated_at", void 0);
exports.Credentials = Credentials = __decorate([
    (0, typeorm_1.Entity)({
        name: 'credentials_v1'
    })
], Credentials);
//# sourceMappingURL=credential.entity.js.map