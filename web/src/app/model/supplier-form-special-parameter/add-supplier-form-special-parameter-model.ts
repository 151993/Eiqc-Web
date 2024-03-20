/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';

import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormSpecialParameter } from './supplier-form-special-parameter';

export class AddSupplierFormSpecialParameterModel extends BaseModel {

    supplierFormId: number;
    parameterName: string;
    resultDesc: string;
    result: boolean;
    supplierForm: SupplierForm;

    constructor(supplierFormSpecialParameter?: SupplierFormSpecialParameter) {
        super(supplierFormSpecialParameter);

        if (supplierFormSpecialParameter) {
            this.supplierForm = supplierFormSpecialParameter.supplierForm;
            this.supplierFormId = supplierFormSpecialParameter.supplierFormId;
            this.parameterName = supplierFormSpecialParameter.parameterName;
            this.resultDesc = supplierFormSpecialParameter.resultDesc;
            this.result = supplierFormSpecialParameter.result;
            this.supplierForm = supplierFormSpecialParameter.supplierForm;
        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.parameterName = Constants.Empty;
            this.resultDesc = Constants.Empty;
            this.result = false;
            this.supplierForm = null;
        }
    }
}
