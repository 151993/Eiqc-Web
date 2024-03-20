/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { DisplayColumn, Trim, FormInput, Expand } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { PCCode } from '../pc-code/pc-code';
import { ColumnType } from '../table/table';

export class InspectionToolsType extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Type')
    type: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;

    @Expand()
    @DisplayColumn('PCCode', { type: ColumnType.MultiStatus, mappingField: 'code' })
    @FormInput()
    pcCodes: PCCode[];

    constructor(inspectionToolsType?: InspectionToolsType) {
        super(inspectionToolsType);

        if (inspectionToolsType) {
            this.type = inspectionToolsType.type;
            this.description = inspectionToolsType.description;
            this.pcCodes = inspectionToolsType.pcCodes;
        } else {
            this.type = Constants.Empty;
            this.description = Constants.Empty;
            this.pcCodes = null;

        }
    }
}
