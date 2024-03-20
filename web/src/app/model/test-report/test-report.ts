/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Commodity } from '../commodity/commodity';
import { ColumnType } from '../table/table';

export class TestReport extends BaseModel {
    @Trim()
    @FormInput()
    @DisplayColumn('Name')
    name: string;

    @Trim()
    @FormInput()
    @DisplayColumn('Description')
    description: string;

    @Expand()
    @FormInput()
    @DisplayColumn('Commodity', { type: ColumnType.MultiStatus, mappingField: 'name' })
    commodities: Commodity[];

    constructor(testReport?: TestReport) {
        super(testReport);
        if (testReport) {
            this.name = testReport.name;
            this.description = testReport.description;
            this.commodities = testReport.commodities;
        } else {
            this.name = Constants.Empty;
            this.description = Constants.Empty;
            this.commodities = null;
        }
    }
}
