/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormPartDateCode } from './supplier-form-part-date-code';

export class UpdateSupplierFormPartDateCodeModel extends BaseModel {

    supplierForm: SupplierForm;
    supplierFormId: number;
    requirement: string;
    supplierDC: string;
    mFGDate: Date;
    result: string;

    constructor(supplierFormPartDateCode?: SupplierFormPartDateCode) {
        super(supplierFormPartDateCode);

        if (supplierFormPartDateCode) {
            this.supplierForm = supplierFormPartDateCode.supplierForm;
            this.supplierFormId = supplierFormPartDateCode.supplierFormId;
            this.requirement = supplierFormPartDateCode.requirement;
            this.supplierDC = supplierFormPartDateCode.supplierDC;
            this.mFGDate = supplierFormPartDateCode.mfgDate;
            this.result = supplierFormPartDateCode.result;
        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.requirement = Constants.Empty;
            this.supplierDC = Constants.Empty;
            this.mFGDate = null;
            this.result = Constants.Empty;
        }
    }
}
