/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { PCCode } from '../pc-code/pc-code';
import { InspectionToolsType } from '../inspection-tools-type/inspection-tools-type';
import { PCCodeInspectionToolsType } from './pc-code-inspection-tools-type';
export class AddPCCodeInspectionToolsTypeModel extends BaseModel {
    pCCode: PCCode;
    pCCodeId: number;
    inspectionToolsType: InspectionToolsType;
    inspectionToolsTypeId: number;
constructor(pCCodeInspectionToolsType?: PCCodeInspectionToolsType) {
    super(pCCodeInspectionToolsType);
    if (pCCodeInspectionToolsType) {
        this.pCCode = pCCodeInspectionToolsType.pcCode;
        this.pCCodeId = pCCodeInspectionToolsType.pCCodeId;
        this.inspectionToolsType = pCCodeInspectionToolsType.inspectionToolsType;
        this.inspectionToolsTypeId = pCCodeInspectionToolsType.inspectionToolsTypeId;
    } else {
        this.pCCode = null;
        this.pCCodeId = 0;
        this.inspectionToolsType = null;
        this.inspectionToolsTypeId = 0;
    }
  }
}
