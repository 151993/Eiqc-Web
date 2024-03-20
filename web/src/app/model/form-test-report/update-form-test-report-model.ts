/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { FormTestReport } from './form-test-report';
export class UpdateFormTestReportModel extends BaseModel {
    form: Form;
    formId: number;
    parameterName: string;
    resultExpected: boolean;
    testCondition: string;
    resultActual: boolean;
constructor(formTestReport?: FormTestReport) {
    super(formTestReport);
    if (formTestReport) {
        this.form = formTestReport.form;
        this.formId = formTestReport.formId;
        this.parameterName = formTestReport.parameterName;
        this.resultExpected = formTestReport.resultExpected;
        this.testCondition = formTestReport.testCondition;
        this.resultActual = formTestReport.resultActual;
    } else {
        this.form = null;
        this.formId = 0;
        this.parameterName = Constants.Empty;
        this.resultExpected = false;
        this.testCondition = Constants.Empty;
        this.resultActual = false;
    }
  }
}
