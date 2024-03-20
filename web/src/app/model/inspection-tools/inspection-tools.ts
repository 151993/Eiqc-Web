/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { DisplayColumn, Trim, FormInput, ExpandSelect } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { InspectionToolsType } from '../inspection-tools-type/inspection-tools-type';
import { ColumnType } from '../table/table';

export class InspectionTools extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @FormInput()
    @DisplayColumn('ValidDate', { type: ColumnType.Date })
    validDate: Date;

    @FormInput()
    inspectionToolsTypeId: number;

    @FormInput()
    @ExpandSelect({ select: ['Id', 'Type', 'IsEnabled'] })
    @DisplayColumn('InspectionToolsType', { type: ColumnType.Status, mappingField: 'type' })
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
