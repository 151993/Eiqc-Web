/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from '../../shared/constant/global';
import { CommodityCategory } from './commodity-category';

export class AddCommodityCategoryModel extends BaseModel {
    name: string;
    commodityCategoryTypeId: number;
    commodityCategoryOptionId: number;

constructor(commodityCategory?: CommodityCategory) {
    super(commodityCategory);
    if (commodityCategory) {
        this.name = commodityCategory.name;
        this.commodityCategoryTypeId = commodityCategory.commodityCategoryTypeId;
        this.commodityCategoryOptionId = commodityCategory.commodityCategoryOptionId;
    } else {
        this.name = Constants.Empty;
        this.commodityCategoryTypeId = Numbers.Default;
        this.commodityCategoryOptionId = Numbers.Default;
    }
  }
}

