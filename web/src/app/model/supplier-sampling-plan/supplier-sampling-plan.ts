
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../base/base-model';

export class SupplierSamplingPlan extends BaseModel {


    supplierSamplingPlanId: number;

    sMSId: number;

    partInspectionSamplingPlanId: number;

    sampleSize: number;

    failedQuantity: number;

    mstrChar: string;

    smplProc: string;

    site: string;

    certificateType: string;

    constructor(supplierSamplingPlan?: SupplierSamplingPlan) {
        super(supplierSamplingPlan);

        if (supplierSamplingPlan) {
            this.supplierSamplingPlanId = supplierSamplingPlan.supplierSamplingPlanId;
            this.sMSId = supplierSamplingPlan.sMSId;
            this.partInspectionSamplingPlanId = supplierSamplingPlan.partInspectionSamplingPlanId;
            this.sampleSize = supplierSamplingPlan.sampleSize;
            this.failedQuantity = supplierSamplingPlan.failedQuantity;
            this.mstrChar = supplierSamplingPlan.mstrChar;
            this.smplProc = supplierSamplingPlan.smplProc;
            this.site = supplierSamplingPlan.site;
            this.certificateType = supplierSamplingPlan.certificateType;
        } else {
            this.supplierSamplingPlanId = Numbers.Default;
            this.sMSId = Numbers.Default;
            this.partInspectionSamplingPlanId = Numbers.Default;
            this.sampleSize = Numbers.Default;
            this.failedQuantity = Numbers.Default;
            this.mstrChar = Constants.Empty;
            this.smplProc = Constants.Empty;
            this.site = Constants.Empty;
            this.certificateType = Constants.Empty;
        }
    }
}
