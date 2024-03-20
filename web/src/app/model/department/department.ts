import {
  DisplayColumn,
  Trim,
  FormInput,
} from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class Department extends BaseModel {
  @Trim()
  @FormInput()
  @DisplayColumn('Name')
  name: string;

  @Trim()
  @FormInput()
  @DisplayColumn('Description')
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
