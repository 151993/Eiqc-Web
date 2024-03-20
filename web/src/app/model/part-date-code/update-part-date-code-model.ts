import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { PartDateCode } from './part-date-code';


export class UpdatePartDateCodeModel extends BaseModel {

    shelfLifeMonths: number;
    manufactureDCWeeks: number;
    manufactureDCYears: number;
    details: string;
    manufactureDate: Date;
    surfaceFinishingDate: Date;
    expireDate: Date;
    dateCodeDetails: string;

    constructor(dateCode?: PartDateCode) {
        super(dateCode);

        if (dateCode) {
            this.manufactureDate = dateCode.manufactureDate;
            this.shelfLifeMonths = dateCode.shelfLifeMonths;
            this.manufactureDCWeeks = dateCode.manufactureDCWeeks;
            this.manufactureDCYears = dateCode.manufactureDCYears;
            this.surfaceFinishingDate = dateCode.surfaceFinishingDate;
            this.dateCodeDetails = dateCode.dateCodeDetails;
            this.expireDate = dateCode.expireDate;
        } else {
            this.manufactureDate = null;
            this.shelfLifeMonths = null;
            this.manufactureDCWeeks = null;
            this.manufactureDCYears = null;
            this.surfaceFinishingDate = null;
            this.expireDate = null;
            this.details = Constants.Empty;
        }
    }
}
