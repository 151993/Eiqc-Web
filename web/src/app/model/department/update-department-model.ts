import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Department } from '../department/department';

export class UpdateDepartmentModel extends BaseModel {
  name: string;
  description: string;
  constructor(department?: Department) {
    super(department);
    if (department) {
      this.name = department.name;
      this.description = department.description;
    } else {
      this.name = Constants.Empty;
      this.description = Constants.Empty;
    }
  }
}
