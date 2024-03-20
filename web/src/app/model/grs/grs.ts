/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn,  FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { Part } from '../part/part';
export class GRS extends BaseModel {
    @FormInput()
    @DisplayColumn('GRSNo')
    grsNo: string;
    @FormInput()
    @Expand()
    part: Part;
    @FormInput()
    @DisplayColumn('PartNo')
    partNo: string;
    @FormInput()
    @DisplayColumn('MedialCode')
    medialCode: string;
    @FormInput()
    mpn: string;
    @FormInput()
    materialName: string;
    @FormInput()
    mfg: string;
    @FormInput()
    quantity: number;
    @FormInput()
    lotNo: string;
    @FormInput()
    inspectQty: number;
    @FormInput()
    rejectionQty: number;
    @FormInput()
    inspectorName: string;
    @FormInput()
    inspectionResult: string;
    @FormInput()
    gRSNoType: string;
    @FormInput()
    vendorCode: string;
    @FormInput()
    matlGroup: string;
    @FormInput()
    vendorName1: string;
    @FormInput()
    skipIQC: string;
    constructor(gRS?: GRS) {
        super(gRS);
        if (gRS) {
            this.grsNo = gRS.grsNo;
            this.partNo = gRS.partNo;
            this.medialCode = gRS.medialCode;
            this.mpn = gRS.mpn;
            this.materialName = gRS.materialName;
            this.mfg = gRS.mfg;
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
            this.grsNo = Constants.Empty;
            this.partNo = null;
            this.partNo = Constants.Empty;
            this.partNo = null;
            this.partNo = Constants.Empty;
            this.medialCode = Constants.Empty;
            this.mpn = Constants.Empty;
            this.materialName = Constants.Empty;
            this.mfg = Constants.Empty;
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
