/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormSpecialParameter extends BaseModel {

    @FormInput()
    supplierFormId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;

    @Trim()
    @FormInput()
    @DisplayColumn('ResultDesc')
    resultDesc: string;


    @FormInput()
    result: boolean;

    @FormInput()
    @Expand()
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
