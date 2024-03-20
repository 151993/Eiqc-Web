import { Constants, Numbers } from 'src/app/shared/constant/global';

export class FailedQuantity {

    masterInspectionTypeId: number;
    fieldName: string;
    failedQuantityCount: number;
    tabId: number;
    failIndicator: number;
    isFail: boolean;
    maverickLotDetected: boolean;

    constructor(failedQuantity?: FailedQuantity) {
        if (failedQuantity) {
            this.masterInspectionTypeId = failedQuantity.masterInspectionTypeId;
            this.fieldName = failedQuantity.fieldName;
            this.failedQuantityCount = failedQuantity.failedQuantityCount;
            this.tabId = failedQuantity.tabId;
            this.failIndicator = failedQuantity.failIndicator;
            this.maverickLotDetected = failedQuantity.maverickLotDetected;
            this.isFail = failedQuantity.isFail;


        } else {
            this.masterInspectionTypeId = Numbers.Default;
            this.fieldName = Constants.Empty;
            this.failedQuantityCount = Numbers.Default;
            this.tabId = Numbers.Default;
            this.failIndicator = Numbers.Default;
            this.maverickLotDetected = false;
            this.isFail = false;
        }
    }

}
