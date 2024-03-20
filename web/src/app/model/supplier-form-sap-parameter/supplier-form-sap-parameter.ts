/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormSAPParameter extends BaseModel {


    @FormInput()
    supplierFormId: Number;

    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string ;

    @Trim()
    @FormInput()
    @DisplayColumn('sapParameterExpected')
    sapParameterExpected: string;

    @Trim()
    @FormInput()
    @DisplayColumn('sapParameterActual')
    sapParameterActual: string;

    @FormInput()
    @Expand()
    supplierForm: SupplierForm;

   constructor(supplierFormSAPParameter?: SupplierFormSAPParameter) {
        super(supplierFormSAPParameter);

        if (supplierFormSAPParameter) {
            this.supplierForm = supplierFormSAPParameter.supplierForm;
            this.supplierFormId = supplierFormSAPParameter.supplierFormId;
            this.parameterName = supplierFormSAPParameter.parameterName;
            this.sapParameterExpected = supplierFormSAPParameter.sapParameterExpected;
            this.sapParameterActual = supplierFormSAPParameter.sapParameterActual;
        } else {
            this.supplierForm = null;
            this.supplierFormId = 0;
            this.parameterName = Constants.Empty;
            this.sapParameterExpected = Constants.Empty;
            this.sapParameterActual = Constants.Empty;
        }
    }
}
