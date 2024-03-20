/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class UpdateBuyerModel extends BaseModel {
name: string;
buyerCode: string;
buyerMail: string;
isValid: boolean;
changeReason: string;
constructor() {
super();
this.name = Constants.Empty;
this.buyerCode = Constants.Empty;
this.buyerMail = Constants.Empty;
this.isValid = false;
}
}
