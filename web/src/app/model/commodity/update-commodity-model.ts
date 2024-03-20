import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../base/base-model';
import { CommodityCategory } from '../commodity-category/commodity-category';

export class UpdateCommodityModel extends BaseModel {
  sapCommodityId: number;
  name: string;
  category: string;
  description: string;
  appearanceInspectionItem: string;
  functionTestItem: string;
  commodityValidFrom: Date;
  commodityValidTo: Date;
  commodityCategoryId: number;
  commodityCategoryOptionId: number;
  commodityCategoryName: CommodityCategory;

  constructor() {
    super();
    this.sapCommodityId = Numbers.Default;
    this.name = Constants.Empty;
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
