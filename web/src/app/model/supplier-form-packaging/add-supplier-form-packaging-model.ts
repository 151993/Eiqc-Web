/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';

import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormPackaging } from './supplier-form-packaging';

export class AddSupplierFormPackagingModel extends BaseModel {

    supplierForm: SupplierForm;
    supplierFormId: number;
    resultDesc: string;
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
