/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { PCCode } from '../pc-code/pc-code';
import { ColumnType } from '../table/table';
import { InspectionToolsType } from '../inspection-tools-type/inspection-tools-type';
export class PCCodeInspectionToolsType extends BaseModel {
    @FormInput()
    @Expand()
    @ExpandSelect({ select: ['Id', 'PCCode', 'IsEnabled'] })
    @DisplayColumn('InspectionToolsType', { type: ColumnType.Status, mappingField: 'pcCode' })
    pcCode: PCCode;
    @FormInput()
    pCCodeId: number;
    @FormInput()
    @Expand()

    @ExpandSelect({ select: ['Id', 'Name', 'IsEnabled'] })
    @DisplayColumn('InspectionToolsType', { type: ColumnType.Status, mappingField: 'name' })
    inspectionToolsType: InspectionToolsType;
    @FormInput()
    inspectionToolsTypeId: number;
    constructor(pCCodeInspectionToolsType?: PCCodeInspectionToolsType) {
        super(pCCodeInspectionToolsType);
        if (pCCodeInspectionToolsType) {
            this.pcCode = pCCodeInspectionToolsType.pcCode;
            this.pCCodeId = pCCodeInspectionToolsType.pCCodeId;
            this.inspectionToolsType = pCCodeInspectionToolsType.inspectionToolsType;
            this.inspectionToolsTypeId = pCCodeInspectionToolsType.inspectionToolsTypeId;
        } else {
            this.pcCode = null;
            this.pCCodeId = 0;
            this.inspectionToolsType = null;
            this.inspectionToolsTypeId = 0;
        }
    }
}
