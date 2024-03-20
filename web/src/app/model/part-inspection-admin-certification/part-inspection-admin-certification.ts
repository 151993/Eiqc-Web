import { BaseModel } from '../base/base-model';

export class PartInspectionAdminCertification extends BaseModel {
    sAPPartInspectionPlanId: number;
    AdminCertificationId: number;
    isEnabled: boolean;



    constructor(sAPPartInspectionPlan?: PartInspectionAdminCertification) {
        super(sAPPartInspectionPlan);

        if (sAPPartInspectionPlan) {
            this.sAPPartInspectionPlanId = sAPPartInspectionPlan.sAPPartInspectionPlanId;
            this.AdminCertificationId = sAPPartInspectionPlan.AdminCertificationId;
            this.isEnabled = sAPPartInspectionPlan.isEnabled;
       } else {
            this.sAPPartInspectionPlanId = 0;
            this.AdminCertificationId = 0;
            this.isEnabled = true;
        }
    }
}
