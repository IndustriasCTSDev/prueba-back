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
exports.CredentialService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const credential_entity_1 = require("./entity/credential.entity");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcryptjs");
let CredentialService = class CredentialService {
    constructor(credentialRepository) {
        this.credentialRepository = credentialRepository;
    }
    async createCredentials(data) {
        const tmpPass = await this.hashPassword(data.password);
        const tmpCredentials = this.credentialRepository.create({
            email: data.email,
            password: tmpPass,
            email_verified: false
        });
        return await this.credentialRepository.save(tmpCredentials);
    }
    async findCredentialsByEmail(email, noError) {
        const res = await this.credentialRepository.findOne({
            where: {
                email
            }
        });
        if (noError) {
            return res;
        }
        if (!res)
            throw new common_1.NotFoundException('Email incorrecto.');
        return res;
    }
    async hashPassword(pass) {
        const hash = bcrypt.hashSync(pass, 8);
        return hash;
    }
};
exports.CredentialService = CredentialService;
exports.CredentialService = CredentialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(credential_entity_1.Credentials)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CredentialService);
//# sourceMappingURL=credential.service.js.map