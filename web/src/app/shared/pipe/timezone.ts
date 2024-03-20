import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';
import { DateTimeFormat } from '../constant/global';

@Pipe({
    name: 'timeZ'
})
export class TimeZonePipe implements PipeTransform {
    transform(value: Date, showTime: boolean): string {
        if (value == null || value === undefined) {
            return '';
        } else {
            let dateFormat = DateTimeFormat.dateFormat;
            if (showTime) {
                dateFormat = DateTimeFormat.dateFormatWithTime;
            }
            const timezone = JSON.parse(localStorage.getItem('timezone'));
            return moment.tz(new Date(value), timezone).format(dateFormat);
        }
    }
}
