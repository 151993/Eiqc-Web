/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Expand, DisplayColumn,  FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { FormType } from '../form-type/form-type';
import { GRS } from '../grs/grs';
export class Form extends BaseModel {
    @FormInput()
    @Expand()
    formType: FormType;
    @FormInput()
    formTypeId: number;
    @FormInput()
    @Expand()
      grs:   GRS;
    @FormInput()
      grsId: number;

    @FormInput()
    dpid: string;
    @FormInput()
    @DisplayColumn('SampleQTY')
    sampleQTY: number;

    @FormInput()
    @DisplayColumn('DateCode')
    dateCode: string;
    @FormInput()
    dateCodeActual: boolean;
    @FormInput()
    finalResult: boolean;

    @FormInput()
    remark: string;

    @FormInput()
    userName: string;

    @FormInput()
    qn: string;

    @FormInput()
    ipVersion: string;

    @FormInput()
    @DisplayColumn('RefDoc')
    refDoc: string;

    @FormInput()
    qnSoftcopy: string;

    @FormInput()
    @DisplayColumn('grsNoType')
      grsNoType: string;

    @FormInput()
    batchDC: string;

    @FormInput()
    storageLoc: string;
    @FormInput()
    requireStatus: number;
    @FormInput()
    packQty: number;
    @FormInput()
    @FormInput()
    oddQtyPerBox: string;

    @FormInput()
    receivingInfo: string;

    @FormInput()
    daNo: string;
    @FormInput()
    packSampleQty: number;
    @FormInput()
    buyerID: number;
    @FormInput()
    divisionId: number;
    @FormInput()
    sapDefectTypeID: number;
    @FormInput()
    vISDefectTypeID: number;
    @FormInput()
    fUNDefectTypeID: number;
    @FormInput()
    funMeasureTypeID: number;
    @FormInput()
    dIMDefectTypeID: number;
    @FormInput()
    mPositionDefectTypeID: number;
    @FormInput()
    lPositionDefectTypeID: number;
    @FormInput()
    dateCodeDefectTypeID: number;
    @FormInput()
    bowTwistDefectTypeID: number;
    @FormInput()
    funParaDefectTypeID: number;
    @FormInput()
    microDefectTypeID: number;
    @FormInput()
    testReportDefectTypeID: number;

    @FormInput()
    specDefectType: string;
    @FormInput()
    lastFormID: number;
    @FormInput()
    lockFlag: number;

    @FormInput()
    lockUser: string;

    @FormInput()
    dcRequirement: string;
    constructor(form?: Form) {
        super(form);
        if (form) {
            this.formType = form.formType;
            this.formTypeId = form.formTypeId;
            this.  grs = form.  grs;
            this.  grsId = form.  grsId;
            this.dpid = form.dpid;
            this.sampleQTY = form.sampleQTY;
            this.dateCode = form.dateCode;
            this.dateCodeActual = form.dateCodeActual;
            this.finalResult = form.finalResult;
            this.remark = form.remark;
            this.userName = form.userName;
            this.qn = form.qn;
            this.ipVersion = form.ipVersion;
            this.refDoc = form.refDoc;
            this.qnSoftcopy = form.qnSoftcopy;
            this.  grsNoType = form.  grsNoType;
            this.batchDC = form.batchDC;
            this.storageLoc = form.storageLoc;
            this.requireStatus = form.requireStatus;
            this.packQty = form.packQty;
            this.oddQtyPerBox = form.oddQtyPerBox;
            this.receivingInfo = form.receivingInfo;
            this.daNo = form.daNo;
            this.packSampleQty = form.packSampleQty;
            this.buyerID = form.buyerID;
            this.divisionId = form.divisionId;
            this.sapDefectTypeID = form.sapDefectTypeID;
            this.vISDefectTypeID = form.vISDefectTypeID;
            this.fUNDefectTypeID = form.fUNDefectTypeID;
            this.funMeasureTypeID = form.funMeasureTypeID;
            this.dIMDefectTypeID = form.dIMDefectTypeID;
            this.mPositionDefectTypeID = form.mPositionDefectTypeID;
            this.lPositionDefectTypeID = form.lPositionDefectTypeID;
            this.dateCodeDefectTypeID = form.dateCodeDefectTypeID;
            this.bowTwistDefectTypeID = form.bowTwistDefectTypeID;
            this.funParaDefectTypeID = form.funParaDefectTypeID;
            this.microDefectTypeID = form.microDefectTypeID;
            this.testReportDefectTypeID = form.testReportDefectTypeID;
            this.specDefectType = form.specDefectType;
            this.lastFormID = form.lastFormID;
            this.lockFlag = form.lockFlag;
            this.lockUser = form.lockUser;
            this.dcRequirement = form.dcRequirement;
        } else {
            this.formType = null;
            this.formTypeId = 0;
            this.  grs = null;
            this.  grsId = 0;
            this.dpid = Constants.Empty;
            this.sampleQTY = 0;
            this.dateCode = Constants.Empty;
            this.dateCodeActual = false;
            this.finalResult = false;
            this.remark = Constants.Empty;
            this.userName = Constants.Empty;
            this.qn = Constants.Empty;
            this.ipVersion = Constants.Empty;
            this.refDoc = Constants.Empty;
            this.qnSoftcopy = Constants.Empty;
            this.  grsNoType = Constants.Empty;
            this.batchDC = Constants.Empty;
            this.storageLoc = Constants.Empty;
            this.requireStatus = 0;
            this.packQty = 0;
            this.oddQtyPerBox = Constants.Empty;
            this.receivingInfo = Constants.Empty;
            this.daNo = Constants.Empty;
            this.packSampleQty = 0;
            this.buyerID = 0;
            this.divisionId = 0;
            this.sapDefectTypeID = 0;
            this.vISDefectTypeID = 0;
            this.fUNDefectTypeID = 0;
            this.funMeasureTypeID = 0;
            this.dIMDefectTypeID = 0;
            this.mPositionDefectTypeID = 0;
            this.lPositionDefectTypeID = 0;
            this.dateCodeDefectTypeID = 0;
            this.bowTwistDefectTypeID = 0;
            this.funParaDefectTypeID = 0;
            this.microDefectTypeID = 0;
            this.testReportDefectTypeID = 0;
            this.specDefectType = Constants.Empty;
            this.lastFormID = 0;
            this.lockFlag = 0;
            this.lockUser = Constants.Empty;
            this.dcRequirement = Constants.Empty;
        }
    }
}
