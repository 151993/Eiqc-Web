/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { DisplayColumn, FormInput } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { Constants } from 'src/app/shared/constant/global';
import { ColumnType } from '../table/table';

export class SamplingPlan extends BaseModel {


    @FormInput()
    @DisplayColumn('PartNo', { type: ColumnType.String, mappingField: 'PART_NO' })
    partNo: string;

    @FormInput()
    @DisplayColumn('Site', { type: ColumnType.String, mappingField: 'SITE' })
    site: string;

    @FormInput()
    @DisplayColumn('WorkCell', { type: ColumnType.String, mappingField: 'MATERIAL_GROUP' })
    materialGroup: string;

    @DisplayColumn('TaskListType', { type: ColumnType.String, mappingField: 'TASK_LIST_TYPE' })
    taskListType: string;

    @FormInput()
    @DisplayColumn('Group', { type: ColumnType.String, mappingField: 'GROUP' })
    group: string;

    @FormInput()
    @DisplayColumn('GroupCounter', { type: ColumnType.String, mappingField: 'GRP_CTR' })
    grpCtr: string;

    @FormInput()
    @DisplayColumn('Counter', { type: ColumnType.String, mappingField: 'COUNTER' })
    counter: string;

    @FormInput()
    @DisplayColumn('CharacteristicType', { type: ColumnType.String, mappingField: 'CHAR_TYPE' })
    charType: string;

    @FormInput()
    @DisplayColumn('InspChar', { type: ColumnType.String, mappingField: 'INSP_CHAR' })
    inspChar: string;

    @FormInput()
    @DisplayColumn('SamplingProcedure', { type: ColumnType.String, mappingField: 'SMPL_PROC' })
    smplProc: string;

    @FormInput()
    @DisplayColumn('Version', { type: ColumnType.String, mappingField: 'VERSION' })
    version: string;


    @FormInput()
    @DisplayColumn('MstrChar', { type: ColumnType.String, mappingField: 'MSTRCHAR' })
    mstrChar: string;


    @FormInput()
    @DisplayColumn('QMControlKey', { type: ColumnType.String, mappingField: 'QM_CTRL_KEY' })
    qmCtrlKey: string;


    @FormInput()
    @DisplayColumn('CertificateType', { type: ColumnType.String, mappingField: 'CERT_TYPE' })
    certType: string;


    @FormInput()
    @DisplayColumn('InspSetUp', { type: ColumnType.String, mappingField: 'INSP_SETUP' })
    inspSetUp: string;


    @FormInput()
    @DisplayColumn('QmActive', { type: ColumnType.String, mappingField: 'QM_ACTIVE' })
    qmActive: string;


    @FormInput()
    @DisplayColumn('InspShortText', { type: ColumnType.String, mappingField: 'INSP_SHORT_TEXT' })
    inspShortText: string;


    @FormInput()
    @DisplayColumn('CreatedOn', { type: ColumnType.String, mappingField: 'CREATED_ON' })
    createdOn: string;


    @FormInput()
    @DisplayColumn('ValidDate', { type: ColumnType.String, mappingField: 'VALID_DATE' })
    validDate: string;

    @FormInput()
    @DisplayColumn('DeleteIndicator', { type: ColumnType.String, mappingField: 'DELETE_IND' })
    deleteInd: string;


    @FormInput()
    @DisplayColumn('InActive', { type: ColumnType.String, mappingField: 'INACTIVE' })
    inActive: string;

    @FormInput()
    @DisplayColumn('PART_NO', { type: ColumnType.StringWithoutLowerCase }, false)
    PART_NO: string;

    @FormInput()
    @DisplayColumn('Site', { type: ColumnType.StringWithoutLowerCase }, false)
    SITE: string;

    @FormInput()
    @DisplayColumn('MATERIAL_GROUP', { type: ColumnType.StringWithoutLowerCase }, false)
    MATERIAL_GROUP: string;

    @FormInput()
    @DisplayColumn('TASK_LIST_TYPE', { type: ColumnType.StringWithoutLowerCase }, false)
    TASK_LIST_TYPE: string;

    @FormInput()
    @DisplayColumn('GROUP', { type: ColumnType.StringWithoutLowerCase }, false)
    GROUP: string;

    @FormInput()
    @DisplayColumn('GRP_CTR', { type: ColumnType.StringWithoutLowerCase }, false)
    GRP_CTR: string;

    @FormInput()
    @DisplayColumn('COUNTER', { type: ColumnType.StringWithoutLowerCase }, false)
    COUNTER: string;

    @FormInput()
    @DisplayColumn('CHAR_TYPE', { type: ColumnType.StringWithoutLowerCase }, false)
    CHAR_TYPE: string;

    @FormInput()
    @DisplayColumn('INSP_CHAR', { type: ColumnType.StringWithoutLowerCase }, false)
    INSP_CHAR: string;

    @FormInput()
    @DisplayColumn('SMPL_PROC', { type: ColumnType.StringWithoutLowerCase }, false)
    SMPL_PROC: string;

    @FormInput()
    @DisplayColumn('VERSION', { type: ColumnType.StringWithoutLowerCase }, false)
    VERSION: string;

    @FormInput()
    @DisplayColumn('MSTRCHAR', { type: ColumnType.StringWithoutLowerCase }, false)
    MSTRCHAR: string;

    @FormInput()
    @DisplayColumn('QM_CTRL_KEY', { type: ColumnType.StringWithoutLowerCase }, false)
    QM_CTRL_KEY: string;

    @FormInput()
    @DisplayColumn('CERT_TYPE', { type: ColumnType.StringWithoutLowerCase }, false)
    CERT_TYPE: string;

    @FormInput()
    @DisplayColumn('INSP_SETUP', { type: ColumnType.StringWithoutLowerCase }, false)
    INSP_SETUP: string;

    @FormInput()
    @DisplayColumn('QM_ACTIVE', { type: ColumnType.StringWithoutLowerCase }, false)
    QM_ACTIVE: string;

    @FormInput()
    @DisplayColumn('INSP_SHORT_TEXT', { type: ColumnType.StringWithoutLowerCase }, false)
    INSP_SHORT_TEXT: string;

    @FormInput()
    @DisplayColumn('CREATED_ON', { type: ColumnType.StringWithoutLowerCase }, false)
    CREATED_ON: string;

    @FormInput()
    @DisplayColumn('VALID_DATE', { type: ColumnType.StringWithoutLowerCase }, false)
    VALID_DATE: string;

    @FormInput()
    @DisplayColumn('DELETE_IND', { type: ColumnType.StringWithoutLowerCase }, false)
    DELETE_IND: string;

    @FormInput()
    @DisplayColumn('INACTIVE', { type: ColumnType.StringWithoutLowerCase }, false)
    INACTIVE: string;

    constructor(part?: SamplingPlan) {
        super(part);
        if (part) {
            this.partNo = part.partNo;
            this.site = part.site;
            this.materialGroup = part.materialGroup;
            this.taskListType = part.taskListType;
            this.group = part.group;
            this.grpCtr = part.grpCtr;
            this.counter = part.counter;
            this.charType = part.charType;
            this.inspChar = part.inspChar;
            this.smplProc = part.smplProc;
            this.version = part.version;
            this.mstrChar = part.mstrChar;
            this.qmCtrlKey = part.qmCtrlKey;
            this.certType = part.certType;
            this.inspSetUp = part.inspSetUp;
            this.qmActive = part.qmActive;
            this.inspShortText = part.inspShortText;
            this.createdOn = part.createdOn;
            this.validDate = part.validDate;
            this.deleteInd = part.deleteInd;
            this.inActive = part.inActive;

        } else {
            this.partNo = Constants.Empty;
            this.site = Constants.Empty;
            this.materialGroup = Constants.Empty;
            this.taskListType = Constants.Empty;
            this.group = Constants.Empty;
            this.grpCtr = Constants.Empty;
            this.counter = Constants.Empty;
            this.charType = Constants.Empty;
            this.inspChar = Constants.Empty;
            this.smplProc = Constants.Empty;
            this.version = Constants.Empty;
            this.mstrChar = Constants.Empty;
            this.qmCtrlKey = Constants.Empty;
            this.certType = Constants.Empty;
            this.inspSetUp = Constants.Empty;
            this.qmActive = Constants.Empty;
            this.inspShortText = Constants.Empty;
            this.createdOn = Constants.Empty;
            this.validDate = Constants.Empty;
            this.deleteInd = Constants.Empty;
            this.inActive = Constants.Empty;
        }
    }
}
