/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';

export class SupplierSpcChartCalculation extends BaseModel {

    parameterId: number;
    supplierMeasurementSubmissionId: number;
    averageValueFor25SMS: number;
    standardDeviation25: number;
    averageValueFor30SMS: number;
    standardDeviation30: number;
    actualTextName: string;
    actualTextValue: number;
    chartTypeId: number;
    finalTextValue: number;
    rangeAverageFor25: number;
    smsNo: string;
    smsState: string;
    smsNoState: string;
    createdDate: Date;
    constructor(supplierSpcChartCalculation?: SupplierSpcChartCalculation) {
        super(supplierSpcChartCalculation);
        if (supplierSpcChartCalculation) {
            this.parameterId = supplierSpcChartCalculation.parameterId;
            this.averageValueFor25SMS = supplierSpcChartCalculation.averageValueFor25SMS;
            this.standardDeviation25 = supplierSpcChartCalculation.standardDeviation25;
            this.averageValueFor30SMS = supplierSpcChartCalculation.averageValueFor30SMS;
            this.standardDeviation30 = supplierSpcChartCalculation.standardDeviation30;
            this.actualTextName = supplierSpcChartCalculation.actualTextName;
            this.actualTextValue = supplierSpcChartCalculation.actualTextValue;
            this.supplierMeasurementSubmissionId = supplierSpcChartCalculation.supplierMeasurementSubmissionId;
            this.chartTypeId = supplierSpcChartCalculation.chartTypeId;
            this.finalTextValue = supplierSpcChartCalculation.finalTextValue;
            this.smsNo = supplierSpcChartCalculation.smsNo;
            this.smsState = supplierSpcChartCalculation.smsState;
            this.smsNoState = supplierSpcChartCalculation.smsNoState;
            this.rangeAverageFor25 = supplierSpcChartCalculation.rangeAverageFor25;
            this.createdDate = supplierSpcChartCalculation.createdDate;

        } else {
            this.parameterId = Numbers.Default;
            this.averageValueFor25SMS = Numbers.Default;
            this.standardDeviation25 = Numbers.Default;
            this.averageValueFor30SMS = Numbers.Default;
            this.standardDeviation30 = Numbers.Default;
            this.actualTextName = Constants.Empty;
            this.actualTextValue = Numbers.Default;
            this.supplierMeasurementSubmissionId = Numbers.Default;
            this.chartTypeId = Numbers.Default;
            this.finalTextValue = Numbers.Default;
            this.smsNo = Constants.Empty;
            this.smsState = Constants.Empty;
            this.smsNoState = Constants.Empty;
            this.rangeAverageFor25 = Numbers.Default;
            this.createdDate = null;

        }
    }
}
