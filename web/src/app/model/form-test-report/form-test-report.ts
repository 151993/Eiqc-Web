/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class FormTestReport extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;
    @FormInput()
    resultExpected: boolean;
    @Trim()
    @FormInput()
    @DisplayColumn('TestCondition')
    testCondition: string;
    @FormInput()
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
