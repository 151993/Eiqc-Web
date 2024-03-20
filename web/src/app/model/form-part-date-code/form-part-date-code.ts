/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormPartDateCode extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @FormInput()
    @DisplayColumn('Requirement')
    requirement: string;
    @FormInput()
    @DisplayColumn('SupplierDC')
    supplierDC: string;
    @FormInput()
    @DisplayColumn('MFGDate')
    mfgDate: string;
    @FormInput()
    @DisplayColumn('Result')
    result: string;
    constructor(formPartDateCode?: FormPartDateCode) {
        super(formPartDateCode);
        if (formPartDateCode) {
            this.form = formPartDateCode.form;
            this.formId = formPartDateCode.formId;
            this.requirement = formPartDateCode.requirement;
            this.supplierDC = formPartDateCode.supplierDC;
            this.mfgDate = formPartDateCode.mfgDate;
            this.result = formPartDateCode.result;
        } else {
            this.form = null;
            this.formId = 0;
            this.requirement = Constants.Empty;
            this.supplierDC = Constants.Empty;
            this.mfgDate = Constants.Empty;
            this.result = Constants.Empty;
        }
    }
}
