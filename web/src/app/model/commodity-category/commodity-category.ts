/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { CommodityCategoryType, Constants, Numbers } from 'src/app/shared/constant/global';

export class CommodityCategory extends BaseModel {
    @Trim()
    @FormInput()
    name: string;

    @FormInput()
    commodityCategoryTypeId: number;

    @FormInput()
    commodityCategoryOptionId: number;

    @FormInput()
    commodityCategoryType: CommodityCategoryType;

    constructor(commodityCategory?: CommodityCategory) {
        super(commodityCategory);

        if (commodityCategory) {
            this.name = commodityCategory.name;
            this.commodityCategoryTypeId = commodityCategory.commodityCategoryTypeId;
            this.commodityCategoryOptionId = commodityCategory.commodityCategoryOptionId;
            this.commodityCategoryType = commodityCategory.commodityCategoryType;
        } else {
            this.name = Constants.Empty;
            this.commodityCategoryTypeId = Numbers.Default;
            this.commodityCategoryOptionId = Numbers.Default;
            this.commodityCategoryType = null;
        }
    }
}
