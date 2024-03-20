import { FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { JsonHelper } from '../helpers/json-helper';
import { ValidationErrorCodes } from '../constant/global';
import * as _ from 'lodash';

export function validateWhiteSpace(c: FormControl) {
  return  (c.value != null && c.value.trim().length > 0)
    ? null
    : JsonHelper.getJsonFromKeyValue(ValidationErrorCodes.validateWhiteSpace, true);
}

// Todo : Remove
export function validateCodeInputRequirement(c: FormControl) {
  const regex = new RegExp('^[a-zA-Z][a-zA-Z0-9-_]*$');
  return regex.test(c.value.trim())
    ? null
    : {
      validateCodeInputRequirement: {
        valid: false
      }
    };
}

export function uniqueClauseValidator(formGroup: FormGroup, id: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (formGroup && formGroup.value.clauses.length > 0) {
      const clauseNum = _.filter(formGroup.value.clauses, function (clause) {
        return clause.clauseNumber === control.value && clause.id !== id;
      });
      return clauseNum.length > 0 ? JsonHelper.getJsonFromKeyValue(ValidationErrorCodes.alreadyExists, true) : null;
    }
    return null;
  };
}

export function uniqueReviewerValidator(formGroup: FormGroup, id: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (formGroup && formGroup.value.reviewers.length > 0) {
      const user = _.filter(formGroup.value.reviewers, function (reviewer) {
        return control.value && reviewer.reviewer === control.value && reviewer.id !== id;
      });
      return user.length > 0 ? JsonHelper.getJsonFromKeyValue(ValidationErrorCodes.alreadyExists, true) : null;
    }
    return null;
  };
}


