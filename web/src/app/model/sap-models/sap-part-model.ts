/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { AdminCertification } from '../admin-certification/admin-certification';
import { SAPManufacturePartNumberModel } from './sap-manufacture-part-number-model';
import { SAPSamplingPlanModel } from './sap-sampling-plan-model';
export class SAPPartModel {
    deleted: boolean;
    id: number;
    isEnabled: boolean;
    partNo: string;
    partRevisionNumber: string;
    partDescription: string;
    commodity: string;
    manufacturer: string;
    manufacturerPartNumber: SAPManufacturePartNumberModel[];
    manufacturerRevisionPartNumber: string;
    adminCertificationId: number;
    adminCertification: AdminCertification;
    supplierName: string;
    supplierPhoneNumber: string;
    supplierEmail: string;
    jabilOwnerContact: string;
    maskedMPN: string;
    mediacode: string;
    mpnMaterial: string;
    site: string;
    vendor: string;
    samplingPlans: SAPSamplingPlanModel[];
}
