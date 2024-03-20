/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SupplierForm } from '../supplier-form/supplier-form';


export class SupplierFormCountParameter extends BaseModel {


    @FormInput()
    supplierFormId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;


    @FormInput()
    @DisplayColumn('FailedQTYExpected')
    failedQTYExpected?: number;


    @FormInput()
    @DisplayColumn('FailedQTYActual')
    failedQTYActual?: number;


    @FormInput()
    iToolsID?: number;

    @Trim()
    @FormInput()
    remark: string ;

    @Trim()
    @FormInput()
    inspectionDetails: string ;

    @FormInput()
    @Expand()
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
            this.failedQTYExpected = null;
            this.failedQTYActual = null;
            this.iToolsID = null;
            this.remark = null;
            this.inspectionDetails = null;
            this.supplierForm = null;

        }
    }
}
