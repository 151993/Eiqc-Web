import {
  DisplayColumn,
  Trim,
  FormInput,
} from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class Region extends BaseModel {
  @Trim()
  @FormInput()
  @DisplayColumn('Name')
  name: string;

  @Trim()
  @FormInput()
  @DisplayColumn('Description')
  description: string;

  constructor(region?: Region) {
    super(region);
    if (region) {
      this.name = region.name;
      this.description = region.description;
    } else {
      this.name = Constants.Empty;
      this.description = Constants.Empty;
    }
  }
}
