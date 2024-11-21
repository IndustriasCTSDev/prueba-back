"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3SourcesModule = void 0;
const common_1 = require("@nestjs/common");
const s3_sources_service_1 = require("./s3-sources.service");
let S3SourcesModule = class S3SourcesModule {
};
exports.S3SourcesModule = S3SourcesModule;
exports.S3SourcesModule = S3SourcesModule = __decorate([
    (0, common_1.Module)({
        providers: [s3_sources_service_1.S3SourcesService],
        exports: [s3_sources_service_1.S3SourcesService],
    })
], S3SourcesModule);
//# sourceMappingURL=s3-sources.module.js.map