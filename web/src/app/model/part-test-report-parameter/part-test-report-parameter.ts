/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../part/part';
export class PartTestReportParameter extends BaseModel {
    @FormInput()
    @Expand()
    part: Part;
    @Trim()
    @FormInput()
    partNo: string;
    @Trim()
    @FormInput()
    @DisplayColumn('ParameterName')
    parameterName: string;
    @FormInput()
    @DisplayColumn('ResultExpected')
    resultExpected: boolean;
    @Trim()
    @FormInput()
    @DisplayColumn('TestCondition')
    testCondition: string;
    @FormInput()
    @DisplayColumn('ResultActual')
    resultActual: boolean;

    constructor(partTestReportParameter?: PartTestReportParameter) {
        super(partTestReportParameter);
        if (partTestReportParameter) {
            this.partNo = partTestReportParameter.partNo;
            this.part = partTestReportParameter.part;
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
