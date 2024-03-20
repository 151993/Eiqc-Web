/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';

import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormSAPParameter } from './supplier-form-sap-parameter';

export class AddSupplierFormSAPParameterModel extends BaseModel {

    supplierFormId: Number;
    parameterName: string ;
    sAPParameterExpected: string;
    sAPParameterActual: string;
    supplierForm: SupplierForm;

   constructor(supplierFormSAPParameter?: SupplierFormSAPParameter) {
        super(supplierFormSAPParameter);

        if (supplierFormSAPParameter) {
            this.supplierForm = supplierFormSAPParameter.supplierForm;
            this.supplierFormId = supplierFormSAPParameter.supplierFormId;
            this.parameterName = supplierFormSAPParameter.parameterName;
            this.sAPParameterExpected = supplierFormSAPParameter.sapParameterExpected;
            this.sAPParameterActual = supplierFormSAPParameter.sapParameterActual;
            this.supplierForm = supplierFormSAPParameter.supplierForm;
        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.parameterName = Constants.Empty;
            this.sAPParameterExpected = Constants.Empty;
            this.sAPParameterActual = Constants.Empty;
            this.supplierForm = null;
        }
    }
}
