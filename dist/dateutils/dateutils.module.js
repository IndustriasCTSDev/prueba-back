"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateutilsModule = void 0;
const common_1 = require("@nestjs/common");
const dateutils_service_1 = require("./dateutils.service");
let DateutilsModule = class DateutilsModule {
};
exports.DateutilsModule = DateutilsModule;
exports.DateutilsModule = DateutilsModule = __decorate([
    (0, common_1.Module)({
        providers: [dateutils_service_1.DateUtilsService],
        exports: [dateutils_service_1.DateUtilsService],
    })
], DateutilsModule);
//# sourceMappingURL=dateutils.module.js.map