
import { DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';

export class SampleSize extends BaseModel {


    @FormInput()
    @DisplayColumn('MaterialNo', { type: ColumnType.String, mappingField: 'PART_NO' })
    partNo: string;


    @FormInput()
    @DisplayColumn('MaterialNo', { type: ColumnType.StringWithoutLowerCase }, false)
    PART_NO: string;


    @FormInput()
    @DisplayColumn('PlanType', { type: ColumnType.String, mappingField: 'PLAN_TYPE' })
    planType: string;


    @FormInput()
    @DisplayColumn('PlanType', { type: ColumnType.StringWithoutLowerCase }, false)
    PLAN_TYPE: string;



    @FormInput()
    @DisplayColumn('GrpNo', { type: ColumnType.String, mappingField: 'GRP_NO' })
    grpNo: string;


    @FormInput()
    @DisplayColumn('GrpNo', { type: ColumnType.StringWithoutLowerCase }, false)
    GRP_NO: string;



    @FormInput()
    @DisplayColumn('GrpCounter', { type: ColumnType.String, mappingField: 'GRP_COUNTER' })
    grpCounter: string;


    @FormInput()
    @DisplayColumn('GrpCounter', { type: ColumnType.StringWithoutLowerCase }, false)
    GRP_COUNTER: string;

    @FormInput()
    @DisplayColumn('CounterAdd', { type: ColumnType.String, mappingField: 'COUNTER_ADD' })
    counterAdd: string;


    @FormInput()
    @DisplayColumn('CounterAdd', { type: ColumnType.StringWithoutLowerCase }, false)
    COUNTER_ADD: string;

    @FormInput()
    @DisplayColumn('Counter', { type: ColumnType.String, mappingField: 'COUNTER' })
    counter: string;


    @FormInput()
    @DisplayColumn('Counter', { type: ColumnType.StringWithoutLowerCase }, false)
    COUNTER: string;

    @FormInput()
    @DisplayColumn('Plant', { type: ColumnType.String, mappingField: 'SITE' })
    site: string;


    @FormInput()
    @DisplayColumn('Plant', { type: ColumnType.StringWithoutLowerCase }, false)
    SITE: string;

    @FormInput()
    @DisplayColumn('Qdmr', { type: ColumnType.String, mappingField: 'QDMR' })
    qdmr: string;


    @FormInput()
    @DisplayColumn('Qdmr', { type: ColumnType.StringWithoutLowerCase }, false)
    QDMR: string;


    @FormInput()
    @DisplayColumn('Dmr', { type: ColumnType.String, mappingField: 'DMR' })
    dmr: string;


    @FormInput()
    @DisplayColumn('Dmr', { type: ColumnType.StringWithoutLowerCase }, false)
    DMR: string;

    @FormInput()
    @DisplayColumn('SamplingProcedure', { type: ColumnType.String, mappingField: 'SMPL_PROC' })
    smplProc: string;


    @FormInput()
    @DisplayColumn('SamplingProcedure', { type: ColumnType.StringWithoutLowerCase }, false)
    SMPL_PROC: string;


    @FormInput()
    @DisplayColumn('DeleteInd', { type: ColumnType.String, mappingField: 'DELETE_IND' })
    deleteInd: string;


    @FormInput()
    @DisplayColumn('DeleteInd', { type: ColumnType.StringWithoutLowerCase }, false)
    DELETE_IND: string;


    @FormInput()
    @DisplayColumn('InspChar', { type: ColumnType.String, mappingField: 'INSP_CHAR' })
    inspChar: string;


    @FormInput()
    @DisplayColumn('InspChar', { type: ColumnType.StringWithoutLowerCase }, false)
    INSP_CHAR: string;

    @FormInput()
    @DisplayColumn('InspMethod', { type: ColumnType.String, mappingField: 'INSP_METHOD' })
    inspMethod: string;

    @FormInput()
    @DisplayColumn('InspMethod', { type: ColumnType.StringWithoutLowerCase }, false)
    INSP_METHOD: string;

    @FormInput()
    @DisplayColumn('MethodVer', { type: ColumnType.String, mappingField: 'METHOD_VER' })
    methodVer: string;

    @FormInput()
    @DisplayColumn('MethodVer', { type: ColumnType.StringWithoutLowerCase }, false)
    METHOD_VER: string;

    @FormInput()
    @DisplayColumn('MethodSite', { type: ColumnType.String, mappingField: 'METHOD_SITE' })
    methodSite: string;

    @FormInput()
    @DisplayColumn('MethodSite', { type: ColumnType.StringWithoutLowerCase }, false)
    METHOD_SITE: string;

    @FormInput()
    @DisplayColumn('MstrInspChars', { type: ColumnType.String, mappingField: 'MSTR_INSP_CHAR' })
    mstrInspChar: string;

    @FormInput()
    @DisplayColumn('MstrInspChars', { type: ColumnType.StringWithoutLowerCase }, false)
    MSTR_INSP_CHAR: string;

    @FormInput()
    @DisplayColumn('MstrVer', { type: ColumnType.String, mappingField: 'MSTR_VER' })
    mstrVer: string;

    @FormInput()
    @DisplayColumn('MstrVer', { type: ColumnType.StringWithoutLowerCase }, false)
    MSTR_VER: string;

    @FormInput()
    @DisplayColumn('SmplSize', { type: ColumnType.String, mappingField: 'SMPL_SIZE' })
    smplSize: string;

    @FormInput()
    @DisplayColumn('SmplSize', { type: ColumnType.StringWithoutLowerCase }, false)
    SMPL_SIZE: string;

    @FormInput()
    @DisplayColumn('SmplType', { type: ColumnType.String, mappingField: 'SMPL_TYPE' })
    smplType: string;

    @FormInput()
    @DisplayColumn('SmplType', { type: ColumnType.StringWithoutLowerCase }, false)
    SMPL_TYPE: string;

    @FormInput()
    @DisplayColumn('ValuationMode', { type: ColumnType.String, mappingField: 'VALUATION_MODE' })
    valuationMode: string;

    @FormInput()
    @DisplayColumn('ValuationMode', { type: ColumnType.StringWithoutLowerCase }, false)
    VALUATION_MODE: string;


    @FormInput()
    @DisplayColumn('SmplScheme', { type: ColumnType.String, mappingField: 'SMPL_SCHEME' })
    smplScheme: string;

    @FormInput()
    @DisplayColumn('SmplScheme', { type: ColumnType.StringWithoutLowerCase }, false)
    SMPL_SCHEME: string;


    @FormInput()
    @DisplayColumn('InspSev', { type: ColumnType.String, mappingField: 'INSP_SEV' })
    inspSev: string;

    @FormInput()
    @DisplayColumn('InspSev', { type: ColumnType.StringWithoutLowerCase }, false)
    INSP_SEV: string;

    @FormInput()
    @DisplayColumn('NoUseIp', { type: ColumnType.String, mappingField: 'NO_USE_IP' })
    noUseIp: string;

    @FormInput()
    @DisplayColumn('NoUseIp', { type: ColumnType.StringWithoutLowerCase }, false)
    NO_USE_IP: string;

    @FormInput()
    @DisplayColumn('UseIp', { type: ColumnType.String, mappingField: 'USE_IP' })
    useIp: string;

    @FormInput()
    @DisplayColumn('UseIp', { type: ColumnType.StringWithoutLowerCase }, false)
    USE_IP: string;


    @FormInput()
    @DisplayColumn('DetermineKey', { type: ColumnType.String, mappingField: 'DETERMINE_KEY' })
    determineKey: string;

    @FormInput()
    @DisplayColumn('DetermineKey', { type: ColumnType.StringWithoutLowerCase }, false)
    DETERMINE_KEY: string;

    @FormInput()
    @DisplayColumn('QdShortText', { type: ColumnType.String, mappingField: 'QD_SHORT_TEXT' })
    qdShortText: string;

    @FormInput()
    @DisplayColumn('QdShortText', { type: ColumnType.StringWithoutLowerCase }, false)
    QD_SHORT_TEXT: string;

    @FormInput()
    @DisplayColumn('CreatedDate', { type: ColumnType.String, mappingField: 'CREATED_ON' })
    createdOn: string;

    @FormInput()
    @DisplayColumn('CreatedDate', { type: ColumnType.StringWithoutLowerCase }, false)
    CREATED_ON: string;

    @FormInput()
    @DisplayColumn('LastModificationDate', { type: ColumnType.String, mappingField: 'CHANGED_ON' })
    changedOn: string;

    @FormInput()
    @DisplayColumn('LastModificationDate', { type: ColumnType.StringWithoutLowerCase }, false)
    CHANGED_ON: string;


    @FormInput()
    @DisplayColumn('SeqCtrItScheme', { type: ColumnType.String, mappingField: 'SEQ_CTR_IT_SCHEME' })
    seqCtrItScheme: string;

    @FormInput()
    @DisplayColumn('SeqCtrItScheme', { type: ColumnType.StringWithoutLowerCase }, false)
    SEQ_CTR_IT_SCHEME: string;

    @FormInput()
    @DisplayColumn('SeqCtrSiScheme', { type: ColumnType.String, mappingField: 'SEQ_CTR_SI_SCHEME' })
    seqCtrSiScheme: string;

    @FormInput()
    @DisplayColumn('SeqCtrSiScheme', { type: ColumnType.StringWithoutLowerCase }, false)
    SEQ_CTR_SI_SCHEME: string;

    @FormInput()
    @DisplayColumn('NoSmplSize', { type: ColumnType.String, mappingField: 'NO_SMPL_SIZE' })
    noSmplSize: string;

    @FormInput()
    @DisplayColumn('NoSmplSize', { type: ColumnType.StringWithoutLowerCase }, false)
    NO_SMPL_SIZE: string;

    @FormInput()
    @DisplayColumn('LotSize', { type: ColumnType.String, mappingField: 'LOT_SIZE' })
    lotSize: string;

    @FormInput()
    @DisplayColumn('LotSize', { type: ColumnType.StringWithoutLowerCase }, false)
    LOT_SIZE: string;

    @FormInput()
    @DisplayColumn('AcptNo', { type: ColumnType.String, mappingField: 'ACPT_NO' })
    acptNo: string;

    @FormInput()
    @DisplayColumn('AcptNo', { type: ColumnType.StringWithoutLowerCase }, false)
    ACPT_NO: string;


    @FormInput()
    @DisplayColumn('RejNo', { type: ColumnType.String, mappingField: 'REJ_NO' })
    rejNo: string;

    @FormInput()
    @DisplayColumn('RejNo', { type: ColumnType.StringWithoutLowerCase }, false)
    REJ_NO: string;

    @FormInput()
    @DisplayColumn('InspSev', { type: ColumnType.String, mappingField: 'QDPA_INSP_SEV' })
    qdpaInspSev: string;

    @FormInput()
    @DisplayColumn('InspSev', { type: ColumnType.StringWithoutLowerCase }, false)
    QDPA_INSP_SEV: string;

    @FormInput()
    @DisplayColumn('InspSev', { type: ColumnType.String, mappingField: 'QDPS_INSP_SEV' })
    qdpsInspSev: string;

    @FormInput()
    @DisplayColumn('InspSev', { type: ColumnType.StringWithoutLowerCase }, false)
    QDPS_INSP_SEV: string;

    @FormInput()
    @DisplayColumn('InspStage', { type: ColumnType.String, mappingField: 'INSP_STAGE' })
    inspStage: string;

    @FormInput()
    @DisplayColumn('InspStage', { type: ColumnType.StringWithoutLowerCase }, false)
    INSP_STAGE: string;

    @FormInput()
    @DisplayColumn('NewInspStgOk', { type: ColumnType.String, mappingField: 'NEW_INSP_STG_OK' })
    newInspStgOk: string;

    @FormInput()
    @DisplayColumn('NewInspStgOk', { type: ColumnType.StringWithoutLowerCase }, false)
    NEW_INSP_STG_OK: string;

    @FormInput()
    @DisplayColumn('NewInspStgNok', { type: ColumnType.String, mappingField: 'NEW_INSP_STG_NOK' })
    newInspStgNok: string;

    @FormInput()
    @DisplayColumn('NewInspStgNok', { type: ColumnType.StringWithoutLowerCase }, false)
    NEW_INSP_STG_NOK: string;

    @FormInput()
    @DisplayColumn('QddrDmr', { type: ColumnType.String, mappingField: 'QDDR_DMR' })
    qddrDmr: string;

    @FormInput()
    @DisplayColumn('QddrDmr', { type: ColumnType.StringWithoutLowerCase }, false)
    QDDR_DMR: string;

    @FormInput()
    @DisplayColumn('InitInspStage', { type: ColumnType.String, mappingField: 'INIT_INSP_STAGE' })
    initInspStage: string;

    @FormInput()
    @DisplayColumn('InitInspStage', { type: ColumnType.StringWithoutLowerCase }, false)
    INIT_INSP_STAGE: string;

    @FormInput()
    @DisplayColumn('QdqlSeqCtr', { type: ColumnType.String, mappingField: 'QDQL_SEQ_CTR' })
    qdqlSeqCtr: string;

    @FormInput()
    @DisplayColumn('QdqlSeqCtr', { type: ColumnType.StringWithoutLowerCase }, false)
    QDQL_SEQ_CTR: string;

    @FormInput()
    @DisplayColumn('QdqlDmr', { type: ColumnType.String, mappingField: 'QDQL_DMR' })
    qdqlDmr: string;

    @FormInput()
    @DisplayColumn('QdqlDmr', { type: ColumnType.StringWithoutLowerCase }, false)
    QDQL_DMR: string;

    @FormInput()
    @DisplayColumn('NextInspStage', { type: ColumnType.String, mappingField: 'NEXT_INSP_STAGE' })
    nextInspStage: string;

    @FormInput()
    @DisplayColumn('NextInspStage', { type: ColumnType.StringWithoutLowerCase }, false)
    NEXT_INSP_STAGE: string;

    @FormInput()
    @DisplayColumn('VendorCode', { type: ColumnType.String, mappingField: 'VENDOR_CODE' })
    vendorCode: string;

    @FormInput()
    @DisplayColumn('VendorCode', { type: ColumnType.StringWithoutLowerCase }, false)
    VENDOR_CODE: string;



    constructor(sampleSize?: SampleSize) {
        super(sampleSize);
        if (sampleSize) {
            this.id = sampleSize.id;
            this.partNo = sampleSize.partNo;
            this.planType = sampleSize.planType;
            this.grpNo = sampleSize.grpNo;
            this.grpCounter = sampleSize.grpCounter;
            this.counterAdd = sampleSize.counterAdd;
            this.counter = sampleSize.counter;
            this.site = sampleSize.site;
            this.qdmr = sampleSize.qdmr;
            this.dmr = sampleSize.dmr;
            this.smplProc = sampleSize.smplProc;
            this.deleteInd = sampleSize.deleteInd;
            this.inspChar = sampleSize.inspChar;
            this.inspMethod = sampleSize.inspMethod;
            this.methodVer = sampleSize.methodVer;
            this.methodSite = sampleSize.methodSite;
            this.mstrInspChar = sampleSize.mstrInspChar;
            this.mstrVer = sampleSize.mstrVer;
            this.smplSize = sampleSize.smplSize;
            this.smplType = sampleSize.smplType;
            this.valuationMode = sampleSize.valuationMode;
            this.smplScheme = sampleSize.smplScheme;
            this.inspSev = sampleSize.inspSev;
            this.noUseIp = sampleSize.noUseIp;
            this.useIp = sampleSize.useIp;
            this.determineKey = sampleSize.determineKey;
            this.qdShortText = sampleSize.qdShortText;
            this.createdOn = sampleSize.createdOn;
            this.changedOn = sampleSize.changedOn;
            this.seqCtrItScheme = sampleSize.seqCtrItScheme;
            this.seqCtrSiScheme = sampleSize.seqCtrSiScheme;
            this.noSmplSize = sampleSize.noSmplSize;
            this.lotSize = sampleSize.lotSize;
            this.acptNo = sampleSize.acptNo;
            this.rejNo = sampleSize.rejNo;
            this.qdpaInspSev = sampleSize.qdpaInspSev;
            this.qdpsInspSev = sampleSize.qdpsInspSev;
            this.inspStage = sampleSize.inspStage;
            this.newInspStgOk = sampleSize.newInspStgOk;
            this.newInspStgNok = sampleSize.newInspStgNok;
            this.qddrDmr = sampleSize.qddrDmr;
            this.initInspStage = sampleSize.initInspStage;
            this.qdqlSeqCtr = sampleSize.qdqlSeqCtr;
            this.qdqlDmr = sampleSize.qdqlDmr;
            this.nextInspStage = sampleSize.nextInspStage;
            this.vendorCode = sampleSize.vendorCode;

        } else {
            this.id = Numbers.Default;
            this.partNo = Constants.Empty;
            this.planType = Constants.Empty;
            this.grpNo = Constants.Empty;
            this.grpCounter = Constants.Empty;
            this.counterAdd = Constants.Empty;
            this.counter = Constants.Empty;
            this.site = Constants.Empty;
            this.qdmr = Constants.Empty;
            this.dmr = Constants.Empty;
            this.smplProc = Constants.Empty;
            this.deleteInd = Constants.Empty;
            this.inspChar = Constants.Empty;
            this.inspMethod = Constants.Empty;
            this.methodVer = Constants.Empty;
            this.methodSite = Constants.Empty;
            this.mstrInspChar = Constants.Empty;
            this.mstrVer = Constants.Empty;
            this.smplSize = Constants.Empty;
            this.smplType = Constants.Empty;
            this.valuationMode = Constants.Empty;
            this.smplScheme = Constants.Empty;
            this.inspSev = Constants.Empty;
            this.noUseIp = Constants.Empty;
            this.useIp = Constants.Empty;
            this.determineKey = Constants.Empty;
            this.qdShortText = Constants.Empty;
            this.createdOn = Constants.Empty;
            this.changedOn = Constants.Empty;
            this.seqCtrItScheme = Constants.Empty;
            this.seqCtrSiScheme = Constants.Empty;
            this.noSmplSize = Constants.Empty;
            this.lotSize = Constants.Empty;
            this.acptNo = Constants.Empty;
            this.rejNo = Constants.Empty;
            this.qdpaInspSev = Constants.Empty;
            this.qdpsInspSev = Constants.Empty;
            this.inspStage = Constants.Empty;
            this.newInspStgOk = Constants.Empty;
            this.newInspStgNok = Constants.Empty;
            this.qddrDmr = Constants.Empty;
            this.initInspStage = Constants.Empty;
            this.qdqlSeqCtr = Constants.Empty;
            this.qdqlDmr = Constants.Empty;
            this.nextInspStage = Constants.Empty;
            this.vendorCode = Constants.Empty;
        }
    }

}
