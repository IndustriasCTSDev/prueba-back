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
exports.QrVisit = void 0;
const bucket_entity_1 = require("../../recursos/entity/bucket.entity");
const typeorm_1 = require("typeorm");
const visitante_entity_1 = require("./visitante.entity");
let QrVisit = class QrVisit {
};
exports.QrVisit = QrVisit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QrVisit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'date_consult'
    }),
    __metadata("design:type", Date)
], QrVisit.prototype, "dateConsult", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bucket_entity_1.Bucket, bucket => bucket.historyQr),
    (0, typeorm_1.JoinColumn)({ name: 'bucket_id' }),
    __metadata("design:type", bucket_entity_1.Bucket)
], QrVisit.prototype, "bucket", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QrVisit.prototype, "bucket_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => visitante_entity_1.Visitante, visitante => visitante.historyQr),
    (0, typeorm_1.JoinColumn)({ name: 'visitante_id' }),
    __metadata("design:type", visitante_entity_1.Visitante)
], QrVisit.prototype, "visitante", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QrVisit.prototype, "visitante_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'route_path'
    }),
    __metadata("design:type", String)
], QrVisit.prototype, "routePath", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 8
    }),
    __metadata("design:type", Number)
], QrVisit.prototype, "latitud", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 8
    }),
    __metadata("design:type", Number)
], QrVisit.prototype, "longitud", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], QrVisit.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], QrVisit.prototype, "updated_at", void 0);
exports.QrVisit = QrVisit = __decorate([
    (0, typeorm_1.Entity)({
        name: 'qr_visit_v1'
    })
], QrVisit);
//# sourceMappingURL=qrVisit.entity.js.map