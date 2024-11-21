import { Injectable } from '@nestjs/common';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';
import { addDays, subDays, parseISO } from 'date-fns';

@Injectable()
export class DateUtilsService {
  private readonly timeZone: string = 'America/Bogota';

  // Formatea una fecha en la zona horaria de Colombia
  formatDateToColombia(date: Date, format: string = 'yyyy-MM-dd HH:mm:ss'): string {
    const zonedDate = toZonedTime(date, this.timeZone); // Convierte la fecha a la zona horaria de Colombia
    return formatInTimeZone(zonedDate, this.timeZone, format); 
  }

  // Convierte una cadena de texto a fecha en la zona horaria de Colombia
  parseDateToColombia(dateString: string): Date {
    const date = parseISO(dateString);
    return fromZonedTime(date, this.timeZone);
  }

  // Agrega días a una fecha
  addDaysToDate(date: Date, days: number): Date {
    return addDays(date, days);
  }

  // Resta días a una fecha
  subtractDaysFromDate(date: Date, days: number): Date {
    return subDays(date, days);
  }
}
