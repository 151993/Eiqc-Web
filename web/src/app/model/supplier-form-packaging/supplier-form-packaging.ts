/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormPackaging extends BaseModel {

    @FormInput()
    @Expand()
    supplierForm: SupplierForm;


    @FormInput()
    supplierFormId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('ResultDesc')
    resultDesc: string;


    @FormInput()
    @DisplayColumn('Result')
    result: boolean;

   constructor(supplierFormPackaging?: SupplierFormPackaging) {
        super(supplierFormPackaging);

        if (supplierFormPackaging) {
            this.supplierForm = supplierFormPackaging.supplierForm;
            this.supplierFormId = supplierFormPackaging.supplierFormId;
            this.resultDesc = supplierFormPackaging.resultDesc;
            this.result = supplierFormPackaging.result;
        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.resultDesc = Constants.Empty;
            this.result = false;
        }
    }
}
