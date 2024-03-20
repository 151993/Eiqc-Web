/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
import { InspectionTools } from '../inspection-tools/inspection-tools';
export class FormCountParameter extends BaseModel {
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
    failedQTYExpected: number;
    @FormInput()
    failedQTYActual: number;
    @FormInput()
    @Expand()
    inspectionTools: InspectionTools;
    @FormInput()
    inspectionToolsId: number;
    @FormInput()
    @DisplayColumn('Remark')
    remark: string;
    @FormInput()
    @DisplayColumn('InspectionDetails')
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
