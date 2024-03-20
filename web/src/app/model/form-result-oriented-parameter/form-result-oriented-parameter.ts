/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormResultOrientedParameter extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;

    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;
    @FormInput()
    resultExpected: boolean;
    @FormInput()
    resultActual: boolean;

    @FormInput()
    @DisplayColumn('TestCondition')
    testCondition: string;

    @FormInput()
    inspectionDetails: string;
    constructor(formResultOrientedParameter?: FormResultOrientedParameter) {
        super(formResultOrientedParameter);
        if (formResultOrientedParameter) {
            this.form = formResultOrientedParameter.form;
            this.formId = formResultOrientedParameter.formId;
            this.parameterName = formResultOrientedParameter.parameterName;
            this.resultExpected = formResultOrientedParameter.resultExpected;
            this.resultActual = formResultOrientedParameter.resultActual;
            this.testCondition = formResultOrientedParameter.testCondition;
            this.inspectionDetails = formResultOrientedParameter.inspectionDetails;
        } else {
            this.form = null;
            this.formId = 0;
            this.parameterName = Constants.Empty;
            this.resultExpected = false;
            this.resultActual = false;
            this.testCondition = Constants.Empty;
            this.inspectionDetails = Constants.Empty;
        }
    }
}
