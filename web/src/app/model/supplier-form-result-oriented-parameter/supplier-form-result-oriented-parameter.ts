/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { SupplierForm } from '../supplier-form/supplier-form';

export class SupplierFormResultOrientedParameter extends BaseModel {


    @FormInput()
    supplierFormId: number;

    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;


    @FormInput()
    resultExpected: boolean;


    @FormInput()
    resultActual: boolean;

    @Trim()
    @FormInput()
    @DisplayColumn('TestCondition')
    testCondition: string;

    @Trim()
    @FormInput()
    @DisplayColumn('InspectionDetails')
    inspectionDetails: string;

    @FormInput()
    @Expand()
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
