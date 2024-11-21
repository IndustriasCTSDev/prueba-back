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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./entity/users.entity");
const typeorm_2 = require("typeorm");
const credential_service_1 = require("../credential/credential.service");
const roles_service_1 = require("../roles/roles.service");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let UsersService = class UsersService {
    constructor(usersRepository, credentialService, rolesService) {
        this.usersRepository = usersRepository;
        this.credentialService = credentialService;
        this.rolesService = rolesService;
    }
    async createUser(userData) {
        const tmpUser = this.usersRepository.create(userData);
        return await this.usersRepository.save(tmpUser);
    }
    async findByEmail(email) {
        const tmpCredentials = await this.credentialService.findCredentialsByEmail(email);
        const tmpUser = await this.usersRepository.findOne({
            relations: {
                credential: true,
                rol: true
            },
            where: {
                credential: tmpCredentials
            }
        });
        return tmpUser;
    }
    async findById(id) {
        const tmpUser = await this.usersRepository.findOne({
            relations: {
                rol: true
            },
            where: {
                id
            }
        });
        return tmpUser;
    }
    async findAllAdmins(options) {
        try {
            const queryBuilder = this.usersRepository.createQueryBuilder('user_v1');
            if (options) {
                return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, options);
            }
            return await this.usersRepository.find();
        }
        catch (error) {
            throw error;
        }
    }
    async createdUserWithCredentials(data) {
        try {
            const exist = await this.credentialService.findCredentialsByEmail(data.credentials.email, true);
            if (exist) {
                throw new common_1.BadRequestException('Ya ha sido creado un usuario con este Email');
            }
            const credential = await this.credentialService.createCredentials({ email: data.credentials.email, password: data.credentials.password });
            const clientRole = await this.rolesService.rolById(2);
            if (credential) {
                const tmpUser = await this.createUser({
                    name: data.name,
                    credential: credential,
                    rol: clientRole
                });
                return tmpUser;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => credential_service_1.CredentialService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => roles_service_1.RolesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        credential_service_1.CredentialService,
        roles_service_1.RolesService])
], UsersService);
//# sourceMappingURL=users.service.js.map