import { Constants } from 'src/app/shared/constant/global';
import { DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';

export class CommodityPartNumberSite extends BaseModel {

  @FormInput()
  @DisplayColumn('PartNumber')
  partNumber: string;

  @FormInput()
  // @DisplayColumn('SiteNo')
  siteNo: string;

  @FormInput()
  commodityId: number;

  constructor(commodityPartNumberSite?: CommodityPartNumberSite) {
    super(commodityPartNumberSite);
    if (commodityPartNumberSite) {
      this.partNumber = commodityPartNumberSite.partNumber;
      this.siteNo = commodityPartNumberSite.siteNo;
      this.commodityId = commodityPartNumberSite.commodityId;

    } else {
      this.partNumber = Constants.Empty;
      this.siteNo = Constants.Empty;
      this.commodityId = 0;

    }
  }
}
