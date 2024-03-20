
import { DisplayColumn, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';

export class PartDateCode extends BaseModel {

    @FormInput()
    @DisplayColumn('ManufactureDate')
    manufactureDate: Date;

    @FormInput()
    @DisplayColumn('ShelfLifeMonths')
    shelfLifeMonths: number;

    @FormInput()
    @DisplayColumn('ManufactureDCWeeks')
    manufactureDCWeeks: number;

    @FormInput()
    @DisplayColumn('ManufactureDCYears')
    manufactureDCYears: number;

    @FormInput()
    @DisplayColumn('SurfaceFinishingDate')
    surfaceFinishingDate: Date;

    @Trim()
    @FormInput()
    @DisplayColumn('Details')
    dateCodeDetails: string;


    @FormInput()
    @DisplayColumn('ExpireDate')
    expireDate: Date;

    dateCodeLimit: number;

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
            this.dateCodeLimit = dateCode.dateCodeLimit;
        } else {
            this.manufactureDate = null;
            this.shelfLifeMonths = null;
            this.manufactureDCWeeks = null;
            this.manufactureDCYears = null;
            this.dateCodeDetails = Constants.Empty;
            this.expireDate = null;
            this.dateCodeLimit = null;
        }
    }
}
