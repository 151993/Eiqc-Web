/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Constants, Numbers } from 'src/app/shared/constant/global';
import { BaseModel } from '../../base/base-model';

export class SupplierSpcChartSummary extends BaseModel {

    tabId: number;

    ruleId: number;

    tabType: string;

    mavericLotDetected: boolean;

    tabResult: boolean;

    failIndicator: number;

    ucl: number;

    lcl: number;

    average: number;

    cpk: number;

    dataCountToDetectMavericLot: number;
    constructor(supplierSpcChartSummary?: SupplierSpcChartSummary) {
        super(supplierSpcChartSummary);
        if (supplierSpcChartSummary) {
            this.tabId = supplierSpcChartSummary.tabId;

            this.ruleId = supplierSpcChartSummary.ruleId;

            this.tabType = supplierSpcChartSummary.tabType;

            this.mavericLotDetected = supplierSpcChartSummary.mavericLotDetected;

            this.tabResult = supplierSpcChartSummary.tabResult;

            this.failIndicator = supplierSpcChartSummary.failIndicator;

            this.ucl = supplierSpcChartSummary.ucl;

            this.lcl = supplierSpcChartSummary.lcl;

            this.average = supplierSpcChartSummary.average;

            this.cpk = supplierSpcChartSummary.cpk;

            this.dataCountToDetectMavericLot = supplierSpcChartSummary.dataCountToDetectMavericLot;
        } else {
            this.tabId = Numbers.Default;

            this.ruleId = Numbers.Default;

            this.tabType = Constants.Empty;

            this.mavericLotDetected = false;

            this.tabResult = false;

            this.ucl = Numbers.Default;

            this.lcl = Numbers.Default;

            this.average = Numbers.Default;

            this.cpk = Numbers.Default;

            this.failIndicator = Numbers.Default;

            this.dataCountToDetectMavericLot = Numbers.Default;

        }
    }
}
