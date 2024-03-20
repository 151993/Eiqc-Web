/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../part/part';
export class PartResultOrientedParameter extends BaseModel {
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
    constructor(partResultOrientedParameter?: PartResultOrientedParameter) {
        super(partResultOrientedParameter);
        if (partResultOrientedParameter) {
            this.part = partResultOrientedParameter.part;
            this.partNo = partResultOrientedParameter.partNo;
            this.parameterName = partResultOrientedParameter.parameterName;
            this.resultExpected = partResultOrientedParameter.resultExpected;
            this.testCondition = partResultOrientedParameter.testCondition;
        } else {
            this.part = null;
            this.partNo = Constants.Empty;
            this.parameterName = Constants.Empty;
            this.resultExpected = false;
            this.testCondition = Constants.Empty;
        }
    }
}
