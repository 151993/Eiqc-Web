/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { TestReport } from './test-report';
import { Commodity } from '../commodity/commodity';

export class UpdateTestReportModel extends BaseModel {
    name: string;
    description: string;
    addedCommodityIds: Commodity[];
    removedCommodityIds: Commodity[];

    constructor(testReport?: TestReport) {
        super(testReport);
        if (testReport) {
            this.name = testReport.name;
            this.description = testReport.description;
            this.addedCommodityIds = testReport.commodities;
        } else {
            this.name = Constants.Empty;
            this.description = Constants.Empty;
            this.addedCommodityIds = null;
            this.removedCommodityIds = null;
        }
    }
}
