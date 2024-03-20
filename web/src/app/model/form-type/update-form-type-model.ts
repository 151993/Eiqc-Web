/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { FormType } from './form-type';
export class UpdateFormTypeModel extends BaseModel {
    formTypeId: number;
    type: string;
constructor(formType?: FormType) {
    super(formType);
    if (formType) {
        this.formTypeId = formType.formTypeId;
        this.type = formType.type;
    } else {
        this.formTypeId = 0;
        this.type = Constants.Empty;
    }
  }
}
