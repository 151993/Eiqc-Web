/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { InspectionToolsType } from './inspection-tools-type';
import { PCCode } from '../pc-code/pc-code';

export class AddInspectionToolsTypeModel extends BaseModel {
    type: string;
    description: string;
    addedPcCodeIds: PCCode[];

    constructor(inspectionToolsType?: InspectionToolsType) {
        super(inspectionToolsType);

        if (inspectionToolsType) {
            this.type = inspectionToolsType.type;
            this.description = inspectionToolsType.description;
            this.addedPcCodeIds = inspectionToolsType.pcCodes;
        } else {
            this.type = Constants.Empty;
            this.description = Constants.Empty;
            this.addedPcCodeIds = null;
        }
    }
}
