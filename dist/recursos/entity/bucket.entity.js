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
exports.Bucket = void 0;
const businessUnit_entity_1 = require("../../business_unit/entity/businessUnit.entity");
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../../projects/entity/project.entity");
const folder_entity_1 = require("./folder.entity");
const attachments_entity_1 = require("./attachments.entity");
const qrVisit_entity_1 = require("../../visitante/entity/qrVisit.entity");
let Bucket = class Bucket {
};
exports.Bucket = Bucket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Bucket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bucket.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bucket.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => businessUnit_entity_1.BusinessUnit, businessUnit => businessUnit.buckets),
    (0, typeorm_1.JoinColumn)({ name: 'business_unit_id' }),
    __metadata("design:type", businessUnit_entity_1.BusinessUnit)
], Bucket.prototype, "business_unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bucket.prototype, "business_unit_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, project => project.buckets),
    (0, typeorm_1.JoinColumn)({ name: 'project_id' }),
    __metadata("design:type", project_entity_1.Project)
], Bucket.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], Bucket.prototype, "project_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => folder_entity_1.Folder, (folder) => folder.bucket),
    __metadata("design:type", Array)
], Bucket.prototype, "folders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attachments_entity_1.Attachment, (attachment) => attachment.bucket),
    __metadata("design:type", Array)
], Bucket.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qrVisit_entity_1.QrVisit, (qrVisit) => qrVisit.bucket),
    __metadata("design:type", Array)
], Bucket.prototype, "historyQr", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Bucket.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Bucket.prototype, "updated_at", void 0);
exports.Bucket = Bucket = __decorate([
    (0, typeorm_1.Entity)({ name: 'bucket_v1' })
], Bucket);
//# sourceMappingURL=bucket.entity.js.map