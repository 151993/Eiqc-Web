/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';
import { SupplierFormCountParameter } from './supplier-form-count-parameter';

export class UpdateSupplierFormCountParameterModel extends BaseModel {

    supplierFormId: number;
    parameterName: string;
    failedQTYExpected?: number;
    failedQTYActual?: number;
    iToolsID?: number;
    remark: string ;
    inspectionDetails: string ;
    supplierForm: SupplierForm;
    constructor(supplierFormCountParameter?: SupplierFormCountParameter) {
        super(supplierFormCountParameter);

        if (supplierFormCountParameter) {
            this.supplierFormId = supplierFormCountParameter.supplierFormId;
            this.parameterName = supplierFormCountParameter.parameterName;
            this.failedQTYExpected = supplierFormCountParameter.failedQTYExpected;
            this.failedQTYActual = supplierFormCountParameter.failedQTYActual;
            this.iToolsID = supplierFormCountParameter.iToolsID;
            this.remark = supplierFormCountParameter.remark;
            this.inspectionDetails = supplierFormCountParameter.inspectionDetails;
            this.supplierForm = supplierFormCountParameter.supplierForm;
        } else {
            this.supplierFormId = 0;
            this.parameterName = Constants.Empty;
            this.failedQTYExpected = 0;
            this.failedQTYActual = 0;
            this.iToolsID = 0;
            this.remark = Constants.Empty;
            this.inspectionDetails =  Constants.Empty;
            this.supplierForm = null;

        }
    }
}
