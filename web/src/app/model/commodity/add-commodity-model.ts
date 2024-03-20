import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../base/base-model';
import { CommodityCategory } from '../commodity-category/commodity-category';
import { Commodity } from './commodity';
import { CommodityName } from './commodity-name';

export class AddCommodityModel extends BaseModel {
  sapCommodityId: number;
  name: string;
  category: string;
  description: string;
  appearanceInspectionItem: string;
  functionTestItem: string;
  commodityValidFrom: Date;
  commodityValidTo: Date;
  addednameIds: CommodityName[];
  commodityCategoryId: number;
  commodityCategoryOptionId: number;
  commodityCategoryName: CommodityCategory;

  constructor(commodity?: Commodity) {
    super(commodity);
    if (commodity) {
      this.sapCommodityId = commodity.sapCommodityId;
      this.name = commodity.name;
      this.category = commodity.category;
      this.description = commodity.description;
      this.appearanceInspectionItem = commodity.appearanceInspectionItem;
      this.functionTestItem = commodity.functionTestItem;
      this.commodityValidFrom = commodity.commodityValidFrom;
      this.commodityValidTo = commodity.commodityValidTo;
      this.commodityCategoryOptionId = commodity.commodityCategoryOptionId;
      this.commodityCategoryId = commodity.commodityCategoryId;
      this.commodityCategoryName = commodity.commodityCategory;

    } else {
      this.sapCommodityId = 0;
      this.name = Constants.Empty;
      this.addednameIds = null;
      this.category = Constants.Empty;
      this.description = Constants.Empty;
      this.appearanceInspectionItem = Constants.Empty;
      this.functionTestItem = Constants.Empty;
      this.commodityValidFrom = null;
      this.commodityValidTo = null;
      this.commodityCategoryOptionId = Numbers.Default;
      this.commodityCategoryId = Numbers.Default;
      this.commodityCategoryName = null;
    }
  }
}
