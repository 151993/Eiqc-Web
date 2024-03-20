import { Constants, Numbers } from 'src/app/shared/constant/global';
import { DisplayColumn } from 'src/app/shared/decorators/property';
import { BaseModel } from '../base/base-model';
import { ColumnType } from '../table/table';

export class SAPSamplingPlanModel extends BaseModel {

    @DisplayColumn('MasterInspectionCharacteristic', { type: ColumnType.String })
    mstrChar: string;
    @DisplayColumn('SamplingProcedure', { type: ColumnType.String })
    smplProc: string;
    @DisplayColumn('SampleSize', { type: ColumnType.String })
    sampleSize: number;
    @DisplayColumn('FailedQuantity', { type: ColumnType.String })
    failedQuantity: number;
    @DisplayColumn('CertificateType', { type: ColumnType.String })
    certificateType: string;
    site: string;

    constructor(sapSamplingPlanModel?: SAPSamplingPlanModel) {
        super(sapSamplingPlanModel);
        if (sapSamplingPlanModel) {
            this.mstrChar = sapSamplingPlanModel.mstrChar;
            this.smplProc = sapSamplingPlanModel.smplProc;
            this.site = sapSamplingPlanModel.site;
            this.certificateType = sapSamplingPlanModel.certificateType;
            this.failedQuantity = sapSamplingPlanModel.failedQuantity;
            this.sampleSize = sapSamplingPlanModel.sampleSize;

        } else {
            this.mstrChar = Constants.Empty;
            this.smplProc = Constants.Empty;
            this.site = Constants.Empty;
            this.certificateType = Constants.Empty;
            this.failedQuantity = Numbers.Default;
            this.sampleSize = Numbers.Default;
        }
    }
}
