/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormPartDateCode extends BaseModel {

    @FormInput()
    @Expand()
    supplierForm?: SupplierForm;


    @FormInput()
    supplierFormId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('Requirement')
    requirement: string;

    @Trim()
    @FormInput()
    @DisplayColumn('SupplierDC')
    supplierDC: string;

    @Trim()
    @FormInput()
    mfgDate: Date;

    @Trim()
    @FormInput()
    result: string;

    constructor(supplierFormPartDateCode?: SupplierFormPartDateCode) {
        super(supplierFormPartDateCode);

        if (supplierFormPartDateCode) {
            this.supplierForm = supplierFormPartDateCode.supplierForm;
            this.supplierFormId = supplierFormPartDateCode.supplierFormId;
            this.requirement = supplierFormPartDateCode.requirement;
            this.supplierDC = supplierFormPartDateCode.supplierDC;
            this.mfgDate = supplierFormPartDateCode.mfgDate;
            this.result = supplierFormPartDateCode.result;
        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.requirement = Constants.Empty;
            this.supplierDC = Constants.Empty;
            this.mfgDate = null;
            this.result = Constants.Empty;
        }
    }
}
