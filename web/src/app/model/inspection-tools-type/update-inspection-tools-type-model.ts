/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { InspectionToolsType } from './inspection-tools-type';
import { PCCode } from '../pc-code/pc-code';

export class UpdateInspectionToolsTypeModel extends BaseModel {
    type: string;
    description: string;
    addedPcCodeIds: PCCode[];
    removedPcCodeIds: PCCode[];

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
            this.removedPcCodeIds = null;
        }
    }

}
