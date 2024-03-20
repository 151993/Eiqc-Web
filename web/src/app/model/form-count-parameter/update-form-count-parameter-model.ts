/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { InspectionTools } from '../inspection-tools/inspection-tools';
import { FormCountParameter } from './form-count-parameter';
export class UpdateFormCountParameterModel extends BaseModel {
    form: Form;
    formId: number;
    parameterName: string;
    failedQTYExpected: number;
    failedQTYActual: number;
    inspectionTools: InspectionTools;
    inspectionToolsId: number;
    remark: string;
    inspectionDetails: string;
constructor(formCountParameter?: FormCountParameter) {
    super(formCountParameter);
    if (formCountParameter) {
        this.form = formCountParameter.form;
        this.formId = formCountParameter.formId;
        this.parameterName = formCountParameter.parameterName;
        this.failedQTYExpected = formCountParameter.failedQTYExpected;
        this.failedQTYActual = formCountParameter.failedQTYActual;
        this.inspectionTools = formCountParameter.inspectionTools;
        this.inspectionToolsId = formCountParameter.inspectionToolsId;
        this.remark = formCountParameter.remark;
        this.inspectionDetails = formCountParameter.inspectionDetails;
    } else {
        this.form = null;
        this.formId = 0;
        this.parameterName = Constants.Empty;
        this.failedQTYExpected = 0;
        this.failedQTYActual = 0;
        this.inspectionTools = null;
        this.inspectionToolsId = 0;
        this.remark = Constants.Empty;
        this.inspectionDetails = Constants.Empty;
    }
  }
}
