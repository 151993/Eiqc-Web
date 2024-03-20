
import { Constants } from 'src/app/shared/constant/global';
import { Expand,  FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { SAPPartInspectionPlan } from '../sap-part-inspection-plan/sap-part-inspection-plan';


export class PartInspectionManufacturePartNumber extends BaseModel {

    @FormInput()
    @Expand()
    sAPPartInspectionPlan: SAPPartInspectionPlan;

    @FormInput()
    sAPPartInspectionPlanId: number;

    MPN: string;

    isEnabled: boolean;

    @FormInput()
    partManufacturePartNumberId: number;

    constructor(partInspectionManufacturePartNumber?: PartInspectionManufacturePartNumber) {
        super(partInspectionManufacturePartNumber);

        if (partInspectionManufacturePartNumber) {
            this.sAPPartInspectionPlan = partInspectionManufacturePartNumber.sAPPartInspectionPlan;
            this.sAPPartInspectionPlanId = partInspectionManufacturePartNumber.sAPPartInspectionPlanId;
            this.partManufacturePartNumberId = partInspectionManufacturePartNumber.partManufacturePartNumberId;
            this.MPN = partInspectionManufacturePartNumber.MPN;
            this.isEnabled = partInspectionManufacturePartNumber.isEnabled;

        } else {
            this.sAPPartInspectionPlan = null;
            this.sAPPartInspectionPlanId = 0;
            this.partManufacturePartNumberId = 0;
            this.MPN = Constants.Empty;
            this.isEnabled = false;
        }
    }
}
