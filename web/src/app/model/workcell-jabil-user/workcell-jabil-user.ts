import { Constants } from 'src/app/shared/constant/global';
import { DisplayColumn, FormInput, Trim } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';

export class WorkCellJabilUser extends BaseModel {
  @Trim()
  @FormInput()
  @DisplayColumn('Name')
  name: string;

  @Trim()
  @FormInput()
  @DisplayColumn('Description')
  description: string;

  constructor(workCellJabilUser?: WorkCellJabilUser) {
    super(workCellJabilUser);
    if (workCellJabilUser) {
      this.name = workCellJabilUser.name;

    } else {
      this.name = Constants.Empty;
      this.description = Constants.Empty;
    }
  }

}
