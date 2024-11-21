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
exports.EventsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const operators_1 = require("rxjs/operators");
const folder_entity_1 = require("../../recursos/entity/folder.entity");
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
let EventsInterceptor = class EventsInterceptor {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        let params = {};
        if (!isEmpty(request.query) && !isEmpty(request.params)) {
            params = {
                ...request.query,
                ...request.params
            };
        }
        else if (!isEmpty(request.query)) {
            params = request.query;
        }
        else if (!isEmpty(request.params)) {
            params = request.params;
        }
        if (request.body) {
            if (request.body.business_unit_id)
                params = { ...params, businessUnit: request.body.business_unit_id };
        }
        console.log(params);
        const data = {
            method: request.method,
            url: request.url,
            user: request.user,
            params: params,
            bucketId: null,
            latitud: request.headers["x-latitud"] | 0,
            longitud: request.headers["x-longitud"] | 0
        };
        if (request.user) {
            if (!data.user.visiter) {
                if (data.method === "GET")
                    this.eventEmitter.emit('admin.history.find', data);
                else if (data.method === "POST")
                    this.eventEmitter.emit('admin.history.created', data);
                else if (data.method === "PUT")
                    this.eventEmitter.emit('admin.history.updated', data);
            }
        }
        return next
            .handle()
            .pipe((0, operators_1.tap)((obs) => {
            if (Array.isArray(obs) && obs.every(item => item instanceof folder_entity_1.Folder)) {
                data.bucketId = obs[0].bucket.id;
            }
            if (obs instanceof folder_entity_1.Folder) {
                data.bucketId = obs.bucket_id;
            }
            if (request.user && data.user.visiter) {
                if (data.method === "GET")
                    this.eventEmitter.emit('visiter.history.find', data);
            }
        }));
    }
};
exports.EventsInterceptor = EventsInterceptor;
exports.EventsInterceptor = EventsInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], EventsInterceptor);
//# sourceMappingURL=events.interceptor.js.map