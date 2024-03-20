/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class Buyer extends BaseModel {
@Trim()
@FormInput()
@DisplayColumn('Name')
name: string;

@Trim()
@FormInput()
@DisplayColumn('BuyerCode')
buyerCode: string;

@Trim()
@FormInput()
@DisplayColumn('BuyerMail')
buyerMail: string;

@FormInput()
isValid: boolean;

constructor(buyer?: Buyer) {
super(buyer);
if (buyer) {
this.name = buyer.name;
this.buyerCode = buyer.buyerCode;
this.buyerMail = buyer.buyerMail;
this.isValid = buyer.isValid;
} else {
this.name = Constants.Empty;
this.buyerCode = Constants.Empty;
this.buyerMail = Constants.Empty;
this.isValid = false;
}
}
}
