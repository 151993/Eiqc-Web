/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Form } from '../form/form';
import { FormPartDateCode } from './form-part-date-code';
export class AddFormPartDateCodeModel extends BaseModel {
    form: Form;
    formId: number;
    requirement: string;
    supplierDC: string;
    mFGDate: string;
    result: string;
constructor(formPartDateCode?: FormPartDateCode) {
    super(formPartDateCode);
    if (formPartDateCode) {
        this.form = formPartDateCode.form;
        this.formId = formPartDateCode.formId;
        this.requirement = formPartDateCode.requirement;
        this.supplierDC = formPartDateCode.supplierDC;
        this.mFGDate = formPartDateCode.mfgDate;
        this.result = formPartDateCode.result;
    } else {
        this.form = null;
        this.formId = 0;
        this.requirement = Constants.Empty;
        this.supplierDC = Constants.Empty;
        this.mFGDate = Constants.Empty;
        this.result = Constants.Empty;
    }
  }
}
