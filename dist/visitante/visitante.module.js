"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitanteModule = void 0;
const common_1 = require("@nestjs/common");
const visitante_service_1 = require("./visitante.service");
const typeorm_1 = require("@nestjs/typeorm");
const visitante_entity_1 = require("./entity/visitante.entity");
const dateutils_module_1 = require("../dateutils/dateutils.module");
const qrVisit_entity_1 = require("./entity/qrVisit.entity");
let VisitanteModule = class VisitanteModule {
};
exports.VisitanteModule = VisitanteModule;
exports.VisitanteModule = VisitanteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([visitante_entity_1.Visitante, qrVisit_entity_1.QrVisit]),
            dateutils_module_1.DateutilsModule
        ],
        providers: [visitante_service_1.VisitanteService],
        exports: [visitante_service_1.VisitanteService, typeorm_1.TypeOrmModule]
    })
], VisitanteModule);
//# sourceMappingURL=visitante.module.js.map