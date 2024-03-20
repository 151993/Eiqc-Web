/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { FormResultOrientedParameter } from './form-result-oriented-parameter';
export class UpdateFormResultOrientedParameterModel extends BaseModel {
    form: Form;
    formId: number;
    parameterName: string;
    resultExpected: boolean;
    resultActual: boolean;
    testCondition: string;
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
