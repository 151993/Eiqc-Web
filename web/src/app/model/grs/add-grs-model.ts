/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { BaseModel } from '../base/base-model';
import { Constants } from '../../shared/constant/global';
import { GRS } from './GRS';
import { Part } from '../part/part';
export class AddGRSModel extends BaseModel {
    gRSNo: string;
    partNo: string;
    part: Part;
    medialCode: string;
    mPN: string;
    materialName: string;
    mFG: string;
    quantity: number;
    lotNo: string;
    inspectQty: number;
    rejectionQty: number;
    inspectorName: string;
    inspectionResult: string;
    gRSNoType: string;
    vendorCode: string;
    matlGroup: string;
    vendorName1: string;
    skipIQC: string;
    constructor(gRS?: GRS) {
        super(gRS);
        if (gRS) {
            this.gRSNo = gRS.grsNo;
            this.part = gRS.part;
            this.partNo = gRS.partNo;
            this.medialCode = gRS.medialCode;
            this.mPN = gRS.mpn;
            this.materialName = gRS.materialName;
            this.mFG = gRS.mfg;
            this.quantity = gRS.quantity;
            this.lotNo = gRS.lotNo;
            this.inspectQty = gRS.inspectQty;
            this.rejectionQty = gRS.rejectionQty;
            this.inspectorName = gRS.inspectorName;
            this.inspectionResult = gRS.inspectionResult;
            this.gRSNoType = gRS.gRSNoType;
            this.vendorCode = gRS.vendorCode;
            this.matlGroup = gRS.matlGroup;
            this.vendorName1 = gRS.vendorName1;
            this.skipIQC = gRS.skipIQC;
        } else {
            this.gRSNo = Constants.Empty;
            this.part = null;
            this.partNo = Constants.Empty;
            this.medialCode = Constants.Empty;
            this.mPN = Constants.Empty;
            this.materialName = Constants.Empty;
            this.mFG = Constants.Empty;
            this.quantity = 0;
            this.lotNo = Constants.Empty;
            this.inspectQty = 0;
            this.rejectionQty = 0;
            this.inspectorName = Constants.Empty;
            this.inspectionResult = Constants.Empty;
            this.gRSNoType = Constants.Empty;
            this.vendorCode = Constants.Empty;
            this.matlGroup = Constants.Empty;
            this.vendorName1 = Constants.Empty;
            this.skipIQC = Constants.Empty;
        }
    }
}
