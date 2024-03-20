
import { Expand, Trim, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { SAPPartInspectionPlan } from '../sap-part-inspection-plan/sap-part-inspection-plan';
import { User } from 'oidc-client';

export class SAPPartInspectionPlanComments extends BaseModel {

    @FormInput()
    sAPPartInspectionPlanCommentsId: number;

    @FormInput()
    statusTypeId: number;

    @Trim()
    @FormInput()
    comments: string;

    @FormInput()
    @Expand()
    sAPPartInspectionPlan: SAPPartInspectionPlan;

    @FormInput()
    sAPPartInspectionPlanId: number;

    createdBy: number;

    created: Date;

    createdDate: string;

    submittedByUserId: number;

    submittedByUser: User[];

    constructor(sAPPartInspectionPlanComments?: SAPPartInspectionPlanComments) {
        super(sAPPartInspectionPlanComments);

        if (sAPPartInspectionPlanComments) {
            this.sAPPartInspectionPlanCommentsId = sAPPartInspectionPlanComments.sAPPartInspectionPlanCommentsId;
            this.statusTypeId = sAPPartInspectionPlanComments.statusTypeId;
            this.comments = sAPPartInspectionPlanComments.comments;
            this.sAPPartInspectionPlan = sAPPartInspectionPlanComments.sAPPartInspectionPlan;
            this.sAPPartInspectionPlanId = sAPPartInspectionPlanComments.sAPPartInspectionPlanId;
            this.submittedByUserId = sAPPartInspectionPlanComments.submittedByUserId;
        } else {
            this.sAPPartInspectionPlanCommentsId = Numbers.Default;
            this.statusTypeId = Numbers.Default;
            this.comments = Constants.Empty;
            this.sAPPartInspectionPlan = null;
            this.sAPPartInspectionPlanId = Numbers.Default;
            this.submittedByUserId = Numbers.Default;
        }
    }
}
