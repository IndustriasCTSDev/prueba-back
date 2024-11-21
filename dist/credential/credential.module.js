"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialModule = void 0;
const common_1 = require("@nestjs/common");
const credential_service_1 = require("./credential.service");
const typeorm_1 = require("@nestjs/typeorm");
const credential_entity_1 = require("./entity/credential.entity");
let CredentialModule = class CredentialModule {
};
exports.CredentialModule = CredentialModule;
exports.CredentialModule = CredentialModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([credential_entity_1.Credentials])
        ],
        providers: [credential_service_1.CredentialService],
        exports: [credential_service_1.CredentialService, typeorm_1.TypeOrmModule]
    })
], CredentialModule);
//# sourceMappingURL=credential.module.js.map