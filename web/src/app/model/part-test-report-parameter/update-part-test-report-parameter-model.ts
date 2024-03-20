/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../part/part';
import { PartTestReportParameter } from './part-test-report-parameter';
export class UpdatePartTestReportParameterModel extends BaseModel {
    part: Part;
    partNo: string;
    parameterName: string;
    resultExpected: boolean;
    testCondition: string;
    resultActual: boolean;
    constructor(partTestReportParameter?: PartTestReportParameter) {
        super(partTestReportParameter);
        if (partTestReportParameter) {
            this.partNo = partTestReportParameter.partNo;
            this.parameterName = partTestReportParameter.parameterName;
            this.resultExpected = partTestReportParameter.resultExpected;
            this.testCondition = partTestReportParameter.testCondition;
            this.resultActual = partTestReportParameter.resultActual;
        } else {
            this.part = null;
            this.partNo = Constants.Empty;
            this.parameterName = Constants.Empty;
            this.resultExpected = false;
            this.testCondition = Constants.Empty;
            this.resultActual = false;
        }
    }
}
