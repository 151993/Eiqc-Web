import { Constants } from 'src/app/shared/constant/global';
import { DisplayColumn, FormInput, Trim } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';

export class MaterialGroup extends BaseModel {
  @Trim()
  @FormInput()
  @DisplayColumn('MaterialGroupName')
  materialGroupName: string;

  @Trim()
  @FormInput()
  @DisplayColumn('SiteName')
  siteName: string;
  constructor(materialGroup?: MaterialGroup) {
    super(materialGroup);
    if (materialGroup) {
      this.materialGroupName = materialGroup.materialGroupName;
      this.siteName = materialGroup.siteName;
    } else {
      this.materialGroupName = Constants.Empty;
      this.siteName = Constants.Empty;
    }
  }
}
