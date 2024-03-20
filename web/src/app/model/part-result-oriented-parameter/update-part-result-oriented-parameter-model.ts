/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../part/part';
import { PartResultOrientedParameter } from './part-result-oriented-parameter';
export class UpdatePartResultOrientedParameterModel extends BaseModel {
    part: Part;
    partNo: string;
    parameterName: string;
    resultExpected: boolean;
    testCondition: string;
constructor(partResultOrientedParameter?: PartResultOrientedParameter) {
    super(partResultOrientedParameter);
    if (partResultOrientedParameter) {
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
