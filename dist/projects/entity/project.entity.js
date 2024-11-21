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
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const statusProject_entity_1 = require("./statusProject.entity");
const bucket_entity_1 = require("../../recursos/entity/bucket.entity");
const management_entity_1 = require("./management.entity");
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => statusProject_entity_1.StatusProject),
    (0, typeorm_1.JoinColumn)({ name: 'status_project_id' }),
    __metadata("design:type", statusProject_entity_1.StatusProject)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 6 }),
    __metadata("design:type", Number)
], Project.prototype, "status_project_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "warranty", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => management_entity_1.Management, management => management.project),
    __metadata("design:type", Array)
], Project.prototype, "managements", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "old_ga", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bucket_entity_1.Bucket, bucket => bucket.project),
    __metadata("design:type", Array)
], Project.prototype, "buckets", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Project.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Project.prototype, "updated_at", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)({
        name: 'project_v1'
    })
], Project);
//# sourceMappingURL=project.entity.js.map