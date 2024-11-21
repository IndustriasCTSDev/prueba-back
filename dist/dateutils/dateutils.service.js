"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtilsService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_tz_1 = require("date-fns-tz");
const date_fns_1 = require("date-fns");
let DateUtilsService = class DateUtilsService {
    constructor() {
        this.timeZone = 'America/Bogota';
    }
    formatDateToColombia(date, format = 'yyyy-MM-dd HH:mm:ss') {
        const zonedDate = (0, date_fns_tz_1.toZonedTime)(date, this.timeZone);
        return (0, date_fns_tz_1.formatInTimeZone)(zonedDate, this.timeZone, format);
    }
    parseDateToColombia(dateString) {
        const date = (0, date_fns_1.parseISO)(dateString);
        return (0, date_fns_tz_1.fromZonedTime)(date, this.timeZone);
    }
    addDaysToDate(date, days) {
        return (0, date_fns_1.addDays)(date, days);
    }
    subtractDaysFromDate(date, days) {
        return (0, date_fns_1.subDays)(date, days);
    }
};
exports.DateUtilsService = DateUtilsService;
exports.DateUtilsService = DateUtilsService = __decorate([
    (0, common_1.Injectable)()
], DateUtilsService);
//# sourceMappingURL=dateutils.service.js.map