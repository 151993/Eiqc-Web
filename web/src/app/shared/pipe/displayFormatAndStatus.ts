import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constant/global';

@Pipe({
  name: 'displayFormatAndStatus',
})
export class DisplayFormatAndStatusPipe implements PipeTransform {
  constructor(private translateService: TranslateService) { }

  transform(value: any, format: string, mappingField: string): string {
    if (value) {
      // tslint:disable-next-line:no-eval
      let fieldValue = format ? eval('`' + format + '`') : value[mappingField];
      if (value.isEnabled !== undefined) {
        if (!value.isEnabled) {
          const index = value[mappingField].indexOf(
            `[${this.translateService.instant('Label.Disabled')}]`
          );
          if (index === -1) {
            fieldValue = `${value[mappingField]} [${this.translateService.instant(
              'Label.Disabled'
            )}]`;
          }
        }
      } else { fieldValue = value; }
      return fieldValue;
    }
    return Constants.Empty;
  }
}
