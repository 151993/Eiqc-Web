import { Constants, Numbers } from 'src/app/shared/constant/global';
import { DisplayColumn, Expand, FormInput, Trim } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { CommodityCategory } from '../commodity-category/commodity-category';
import { ColumnType } from '../table/table';

export class Commodity extends BaseModel {

  @FormInput()
  @DisplayColumn('SAPCommodityId', { type: ColumnType.Number, mappingField: 'SAPCommodityId' })
  sapCommodityId: number;

  @FormInput()
  @DisplayColumn('Name', { type: ColumnType.Number, mappingField: 'Name' })
  name: string;

  @Trim()
  @FormInput()
  @DisplayColumn('Category', { type: ColumnType.Number, mappingField: 'Category' })
  category: string;

  @Trim()
  @FormInput()
  @DisplayColumn('Description', { type: ColumnType.Number, mappingField: 'Description' })
  description: string;

  @Trim()
  @FormInput()
  // @DisplayColumn('AppearanceInspectionItem')
  appearanceInspectionItem: string;

  @Trim()
  @FormInput()
  // @DisplayColumn('FunctionTestItem')
  functionTestItem: string;

  @FormInput()
  @DisplayColumn('CommodityValidFrom', { type: ColumnType.Date, mappingField: 'CommodityValidFrom' })
  commodityValidFrom: Date;

  @FormInput()
  @DisplayColumn('CommodityValidTo', { type: ColumnType.Date, mappingField: 'CommodityValidTo' })
  commodityValidTo: Date;

  @FormInput()
  commodityCategoryId: number;

  @FormInput()
  commodityCategoryOptionId: number;

  @FormInput()
  @Expand()
  commodityCategory: CommodityCategory;

  @FormInput()
  @DisplayColumn('PartNo', { type: ColumnType.String, mappingField: 'PART_NO'})
  parT_NO: string;

  @FormInput()
  @DisplayColumn('SiteNo', { type: ColumnType.String, mappingField: 'SiteNo' })
  siteNo: string;

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
      this.commodityCategory = commodity.commodityCategory;
      this.siteNo =  commodity.siteNo;
      this.parT_NO = commodity.parT_NO;

    } else {
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
      this.commodityCategory = null;
      this.siteNo =  Constants.Empty;
      this.parT_NO =  Constants.Empty;

    }
  }
}
