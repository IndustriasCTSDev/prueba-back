"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const credential_module_1 = require("./credential/credential.module");
const roles_module_1 = require("./roles/roles.module");
const visitante_module_1 = require("./visitante/visitante.module");
const dateutils_module_1 = require("./dateutils/dateutils.module");
const mailer_module_1 = require("./mailer/mailer.module");
const recursos_module_1 = require("./recursos/recursos.module");
const business_unit_module_1 = require("./business_unit/business_unit.module");
const s3_sources_module_1 = require("./s3-sources/s3-sources.module");
const projects_module_1 = require("./projects/projects.module");
const template_module_1 = require("./template/template.module");
const settings_app_module_1 = require("./settings-app/settings-app.module");
const events_module_1 = require("./events/events.module");
const config_2 = require("./config/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [config_2.default],
                isGlobal: true
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            database_module_1.DatabaseModule,
            credential_module_1.CredentialModule,
            roles_module_1.RolesModule,
            visitante_module_1.VisitanteModule,
            dateutils_module_1.DateutilsModule,
            mailer_module_1.MailerModule,
            recursos_module_1.RecursosModule,
            business_unit_module_1.BusinessUnitModule,
            s3_sources_module_1.S3SourcesModule, projects_module_1.ProjectsModule, template_module_1.TemplateModule, settings_app_module_1.SettingsAppModule, events_module_1.EventsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map