import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Region } from '../region/region';

export class UpdateRegionModel extends BaseModel {
  name: string;
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
