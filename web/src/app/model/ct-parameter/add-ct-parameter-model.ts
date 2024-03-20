/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { CTParameter } from './ct-parameter';


export class AddCTParameterModel extends BaseModel {


  name: string;

    description: string;

    constructor(cTParameter?: CTParameter) {
      super(cTParameter);

      if (cTParameter) {
          this.name = cTParameter.name;
          this.description = cTParameter.description;
      } else {
          this.name = Constants.Empty;
          this.description = Constants.Empty;
      }
  }
}
