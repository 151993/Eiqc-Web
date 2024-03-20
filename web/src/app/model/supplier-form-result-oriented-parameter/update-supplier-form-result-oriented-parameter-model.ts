/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierFormResultOrientedParameter } from './supplier-form-result-oriented-parameter';
import { SupplierForm } from '../supplier-form/supplier-form';

export class UpdateSupplierFormResultOrientedParameterModel extends BaseModel {

    supplierFormId: number;
    parameterName: string;
    resultExpected: boolean;
    resultActual: boolean;
    testCondition: string;
    inspectionDetails: string;
    supplierForm: SupplierForm;

    constructor(supplierFormResultOrientedParameter?: SupplierFormResultOrientedParameter) {
        super(supplierFormResultOrientedParameter);

        if (supplierFormResultOrientedParameter) {
            this.supplierFormId = supplierFormResultOrientedParameter.supplierFormId;
            this.parameterName = supplierFormResultOrientedParameter.parameterName;
            this.resultExpected = supplierFormResultOrientedParameter.resultExpected;
            this.resultActual = supplierFormResultOrientedParameter.resultActual;
            this.testCondition = supplierFormResultOrientedParameter.testCondition;
            this.inspectionDetails = supplierFormResultOrientedParameter.inspectionDetails;
            this.supplierForm = supplierFormResultOrientedParameter.supplierForm;
        } else {
            this.supplierFormId = 0;
            this.parameterName = Constants.Empty;
            this.resultExpected = false;
            this.resultActual = false;
            this.testCondition = Constants.Empty;
            this.inspectionDetails = Constants.Empty;
            this.supplierForm = null;
        }
    }
}
