"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsAppModule = void 0;
const common_1 = require("@nestjs/common");
const settings_app_service_1 = require("./settings-app.service");
const settings_app_controller_1 = require("./settings-app.controller");
const template_module_1 = require("../template/template.module");
const users_module_1 = require("../users/users.module");
let SettingsAppModule = class SettingsAppModule {
};
exports.SettingsAppModule = SettingsAppModule;
exports.SettingsAppModule = SettingsAppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            template_module_1.TemplateModule,
            users_module_1.UsersModule
        ],
        providers: [settings_app_service_1.SettingsAppService],
        controllers: [settings_app_controller_1.SettingsAppController]
    })
], SettingsAppModule);
//# sourceMappingURL=settings-app.module.js.map