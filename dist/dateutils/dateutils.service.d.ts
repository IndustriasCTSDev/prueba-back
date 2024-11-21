export declare class DateUtilsService {
    private readonly timeZone;
    formatDateToColombia(date: Date, format?: string): string;
    parseDateToColombia(dateString: string): Date;
    addDaysToDate(date: Date, days: number): Date;
    subtractDaysFromDate(date: Date, days: number): Date;
}
