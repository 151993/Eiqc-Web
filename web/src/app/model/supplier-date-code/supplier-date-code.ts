
import { Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class SupplierDateCode extends BaseModel {

    @FormInput()
    manufactureDate: Date;

    @FormInput()
    shelfLifeMonths: number;

    @FormInput()
    manufactureDCWeeks: number;

    @FormInput()
    manufactureDCYears: number;

    @FormInput()
    surfaceFinishingDate: Date;

    @Trim()
    @FormInput()
    dateCodeDetails: string;

    @FormInput()
    expireDate: Date;

    dateCodeLimit: number;

    acceptRejectId: number;
    remainingDays: number;

    constructor(dateCode?: SupplierDateCode) {
        super(dateCode);

        if (dateCode) {
            this.manufactureDate = dateCode.manufactureDate;
            this.shelfLifeMonths = dateCode.shelfLifeMonths;
            this.manufactureDCWeeks = dateCode.manufactureDCWeeks;
            this.manufactureDCYears = dateCode.manufactureDCYears;
            this.surfaceFinishingDate = dateCode.surfaceFinishingDate;
            this.dateCodeDetails = dateCode.dateCodeDetails;
            this.expireDate = dateCode.expireDate;
            this.dateCodeLimit = dateCode.dateCodeLimit;
            this.acceptRejectId = dateCode.acceptRejectId;
            this.remainingDays = dateCode.remainingDays;
        } else {
            this.manufactureDate = null;
            this.shelfLifeMonths = null;
            this.manufactureDCWeeks = null;
            this.manufactureDCYears = null;
            this.dateCodeDetails = Constants.Empty;
            this.expireDate = null;
            this.dateCodeLimit = null;
            this.acceptRejectId = null;
            this.remainingDays = null;
        }
    }
}
