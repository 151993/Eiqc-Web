import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Division } from './division';

export class UpdateDivisionModel extends BaseModel {
  name: string;
  description: string;
  constructor(division?: Division) {
    super(division);
    if (division) {
      this.name = division.name;
      this.description = division.description;
    } else {
      this.name = Constants.Empty;
      this.description = Constants.Empty;
    }
  }
}
