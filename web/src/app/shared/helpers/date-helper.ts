import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class DateHelper {
    static getDateFromNgbDate(ngbDate: NgbDate): Date {
        return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    }

    static getNgbDateFromDate(date: Date): NgbDate {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        } as NgbDate;
    }

    static getDateTimeString(date?: Date): string {
        let result = '';

        if (!date) {
            date = new Date();
        }

        result += date.getFullYear();
        result += (date.getMonth() > 8) ? (1 + date.getMonth()) : ('0' + (1 + date.getMonth()));
        result += (date.getDate() > 9) ? date.getDate() : ('0' + date.getDate());
        result += (date.getHours() > 9) ? date.getHours() : ('0' + date.getHours());
        result += (date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes());
        result += (date.getSeconds() > 9) ? date.getSeconds() : ('0' + date.getSeconds());
        return result;
    }
}
