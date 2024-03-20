import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/empty';
import { of, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ValidationErrorCodes } from '../constant/global';
import { BaseDataService } from '../base/base-data.service';
import { JsonHelper } from '../helpers/json-helper';

export function uniqueAsyncValidator(baseService: BaseDataService, originalValue: string, name: string): AsyncValidatorFn {
  const subject = new BehaviorSubject<string>('');
  const debouncedInput$ = subject.asObservable()
    .pipe(
      distinctUntilChanged(),
      debounceTime(environment.timer.debounceTimer),
      switchMap(value => {
        let inputValue = value as string;
        inputValue = inputValue.trim();

        if (!inputValue || originalValue.toLowerCase() === inputValue.toLowerCase()) {
          return of(null);
        }

      return baseService.isAlreadyExists(name, inputValue)
        .pipe(
          map<boolean, ValidationErrors>(result => result ?
            JsonHelper.getJsonFromKeyValue(ValidationErrorCodes.alreadyExists, true) : null
          ));

      })
    );
  return (control: AbstractControl): Observable<ValidationErrors> => {
    subject.next(control.value);
    return debouncedInput$;
  };
}


