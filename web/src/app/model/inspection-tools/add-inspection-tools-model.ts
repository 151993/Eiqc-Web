/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { InspectionToolsType } from '../inspection-tools-type/inspection-tools-type';
import { InspectionTools } from './inspection-tools';

export class AddInspectionToolsModel extends BaseModel {
    name: string;
    validDate: Date;
    inspectionToolsTypeId: number;
    inspectionToolsType: InspectionToolsType;

    constructor(inspectionTools?: InspectionTools) {
        super(inspectionTools);
        if (inspectionTools) {
            this.inspectionToolsType = inspectionTools.inspectionToolsType;
            this.inspectionToolsTypeId = inspectionTools.inspectionToolsTypeId;
            this.validDate = inspectionTools.validDate;
            this.name = inspectionTools.name;
        } else {
            this.inspectionToolsType = null;
            this.inspectionToolsTypeId = 0;
            this.name = Constants.Empty;
            this.validDate = null;
        }
    }
}
