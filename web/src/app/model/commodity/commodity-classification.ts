import { Constants } from 'src/app/shared/constant/global';
import { DisplayColumn, FormInput, Trim } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';

export class CommodityClassification extends BaseModel {

  @FormInput()
  commodity_CLASSIFICATION_ID: string;

  @FormInput()
  part_NO: string;


  @FormInput()
  site_NO: string;

  @FormInput()
  @DisplayColumn('SAPCommodityId')
  commodity_ID: string;

  @FormInput()
  @DisplayColumn('Name')
  commodity_NAME: string;

  @Trim()
  @FormInput()
  @DisplayColumn('Description')
  commodity_DESC: string;

  @FormInput()
  @DisplayColumn('CommodityValidFrom')
  valid_FROM: string;

  @FormInput()
  @DisplayColumn('CommodityValidTo')
  valid_TO: string;

  @FormInput()
  changed_ON: string;

  @FormInput()
  status: string;

  constructor(commodity?: CommodityClassification) {
    super(commodity);
    if (commodity) {
      this.commodity_CLASSIFICATION_ID = commodity.commodity_CLASSIFICATION_ID;
      this.part_NO = commodity.part_NO;
      this.site_NO = commodity.site_NO;
      this.commodity_ID = commodity.commodity_ID;
      this.commodity_NAME = commodity.commodity_NAME;
      this.commodity_DESC = commodity.commodity_DESC;
      this.valid_FROM = commodity.valid_FROM;
      this.valid_TO = commodity.valid_TO;
      this.changed_ON = commodity.changed_ON;
      this.status = commodity.status;

    } else {
      this.commodity_CLASSIFICATION_ID = Constants.Empty;
      this.part_NO = Constants.Empty;
      this.site_NO = Constants.Empty;
      this.commodity_ID = Constants.Empty;
      this.commodity_NAME = Constants.Empty;
      this.commodity_DESC = Constants.Empty;
      this.valid_FROM = Constants.Empty;
      this.valid_TO = Constants.Empty;
      this.changed_ON = Constants.Empty;
      this.status = Constants.Empty;
    }
  }
}
