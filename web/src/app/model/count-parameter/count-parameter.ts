import { Constants } from 'src/app/shared/constant/global';
import { DisplayColumn } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { ColumnType } from '../table/table';

export class CountParameter extends BaseModel {
    @DisplayColumn(Constants.Empty, { type: ColumnType.CheckBox }, true, false, null)
    id: number;

    @DisplayColumn('Name')
    name: string;

    @DisplayColumn('ToolsType', { type: ColumnType.DynamicType, mappingField: 'type' })
    toolsType: string;

    @DisplayColumn('DetailDefine', { type: ColumnType.TextBox })
    detailDefine: string;

    constructor(countParameter?: CountParameter) {
        super(countParameter);
        if (countParameter) {
            this.name = countParameter.name;
            this.toolsType = countParameter.toolsType;
            this.detailDefine = countParameter.detailDefine;

        } else {
            this.name = Constants.Empty;
            this.toolsType = null;
            this.detailDefine = Constants.Empty;

        }
    }
}
