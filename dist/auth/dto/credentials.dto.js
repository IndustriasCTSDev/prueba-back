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
exports.CredentialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let CredentialDto = class CredentialDto {
};
exports.CredentialDto = CredentialDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'correo electronico',
        description: 'El correo electrónico asociado a las credenciales',
        default: 'auxiliar2@industriascts.com.co'
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toLowerCase(), { toClassOnly: true }),
    __metadata("design:type", String)
], CredentialDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Contraseña',
        description: 'La contraseña asociada a las credenciales',
        default: '1095802996'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CredentialDto.prototype, "password", void 0);
exports.CredentialDto = CredentialDto = __decorate([
    (0, swagger_1.ApiExtraModels)()
], CredentialDto);
//# sourceMappingURL=credentials.dto.js.map