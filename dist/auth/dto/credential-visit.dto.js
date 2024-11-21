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
exports.CredentialVisitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let CredentialVisitDto = class CredentialVisitDto {
};
exports.CredentialVisitDto = CredentialVisitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'correo electronico del visitante',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toLowerCase(), { toClassOnly: true }),
    __metadata("design:type", String)
], CredentialVisitDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Nombre Visitante',
        description: 'Nombre del visitante asociado al email',
        default: '1095802996'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CredentialVisitDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Nombre de la empresa visitante',
        description: 'Nombre de la empresa (opcional)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CredentialVisitDto.prototype, "empresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'NIT del visitante',
        description: 'NIT del visitante (opcional)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CredentialVisitDto.prototype, "nit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'telefono del visitante',
        description: 'telefono del visitante (opcional)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CredentialVisitDto.prototype, "telefono", void 0);
exports.CredentialVisitDto = CredentialVisitDto = __decorate([
    (0, swagger_1.ApiExtraModels)()
], CredentialVisitDto);
//# sourceMappingURL=credential-visit.dto.js.map