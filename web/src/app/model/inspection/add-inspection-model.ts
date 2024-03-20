/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { Inspection } from './inspection';
import { Form } from '../form/form';
export class AddInspectionModel extends BaseModel {
    form: Form;
    formId: number;
    inspector: string;
    inspectionResult: string;
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
