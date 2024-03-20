/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Form } from '../form/form';
export class Inspection extends BaseModel {
    @FormInput()
    @Expand()
    form: Form;
    @FormInput()
    formId: number;
    @Trim()
    @FormInput()
    @DisplayColumn('Inspector')
    inspector: string;
    @Trim()
    @FormInput()
    @DisplayColumn('InspectionResult')
    inspectionResult: string;
    @Trim()
    @FormInput()
    @DisplayColumn('ReportFullName')
    reportFullName: string;
    constructor(inspection?: Inspection) {
        super(inspection);
        if (inspection) {
            this.form = inspection.form;
            this.formId = inspection.formId;
            this.inspector = inspection.inspector;
            this.inspectionResult = inspection.inspectionResult;
            this.reportFullName = inspection.reportFullName;
        } else {
            this.form = null;
            this.formId = 0;
            this.inspector = Constants.Empty;
            this.inspectionResult = Constants.Empty;
            this.reportFullName = Constants.Empty;
        }
    }
}
