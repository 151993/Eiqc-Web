import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import * as _ from 'lodash';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { QssChartConfiguration } from 'qss-ui-charts/lib/models/qss-chart-configuration';
import { chartRules, ChartType, Constants } from 'src/app/shared/constant/global';

@Component({
  selector: 'app-spc-chart-micro-section',
  templateUrl: './spc-chart-micro-section.component.html',
  styleUrls: ['./spc-chart-micro-section.component.css']
})
export class SpcChartMicroSectionComponent extends BaseDetailComponent implements OnInit {
  detail: any;
  isInsufficientLot: boolean;
  ipNo: string;
  isXBarR = false;
  cpk: any;
  nominal: any;
  upper: any;
  lower: any;
  parameter: string;
  isIMR = false;
  isXBarS = false;

  chartConfigXBarR: QssChartConfiguration = {
    lcl: 0,
    ucl: 0,
    pivot: 0,
    isLCLRequired: true,
    isUCLRequired: true,
    isFirstFourRuleApplicable : true,
    isLastFourRuleApplicable: true,
    title: 'xBar-R Chart',
    data: {
      labels: [],
      datasets: []
    }
  };

  chartConfigRangeXBarR: QssChartConfiguration = {
    lcl: 0,
    ucl: 0,
    pivot: 0,
    isLCLRequired: true,
    isUCLRequired: true,
    isFirstFourRuleApplicable : true,
    isLastFourRuleApplicable: false,
    title: 'R-Bar',
    data: {
      labels: [],
      datasets: []
    }
  };

  chartConfigXBarS: QssChartConfiguration = {
    lcl: 0,
    ucl: 0,
    pivot: 0,
    isLCLRequired: true,
    isUCLRequired: true,
    isFirstFourRuleApplicable : true,
    isLastFourRuleApplicable: true,
    title: 'xBar-S Chart',
    data: {
      labels: [],
      datasets: []
    }
  };

  chartConfigRangeXBarS: QssChartConfiguration = {
    lcl: 0,
    ucl: 0,
    pivot: 0,
    isLCLRequired: true,
    isUCLRequired: true,
    isFirstFourRuleApplicable : true,
    isLastFourRuleApplicable: false,
    title: 'S-Bar',
    data: {
      labels: [],
      datasets: []
    }
  };

  chartConfigIMR: QssChartConfiguration = {
    lcl: 0,
    ucl: 0,
    pivot: 0,
    isLCLRequired: true,
    isUCLRequired: true,
    isFirstFourRuleApplicable : true,
    isLastFourRuleApplicable: true,
    title: 'IMR Chart',
    data: {
      labels: [],
      datasets: []
    }
  };

  chartConfigRangeIMR: QssChartConfiguration = {
    lcl: 0,
    ucl: 0,
    pivot: 0,
    isLCLRequired: false,
    isUCLRequired: true,
    isFirstFourRuleApplicable : true,
    isLastFourRuleApplicable: false,
    title: 'Range IMR Chart',
    data: {
      labels: [],
      datasets: []
    }
  };

  @Output() public closeClickedEvent: EventEmitter<any> = new EventEmitter<any>();
  basicOptions: any;
  private readonly ucLRConstantForIMR = 3.268;
  accuracy: any;
  isMavericLotDetectedForXBarR: boolean;
  isMavericLotDetectedForRangeXBarR: boolean;
  isMavericLotDetectedForRangeXBarS: boolean;
  isMavericLotDetectedForIMR: boolean;
  isMavericLotDetectedForRangeIMR: boolean;
  isMavericLotDetectedForXBarS: boolean;
  ruleNameForXBarR: string = Constants.Empty;
  ruleNameForRangeXBarR: string = Constants.Empty;
  ruleNameForXBarS: string = Constants.Empty;
  ruleNameForRangeXBarS: string = Constants.Empty;
  ruleNameForIMR: string = Constants.Empty;
  ruleNameForRangeIMR: string = Constants.Empty;
  constructor(
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService,
    public activeModal: NgbActiveModal) {
    super(
      modalService,
      activatedRoute,
      router,
      notificationService,
      authService
    );
    // this.initForm();

    this.canAccessPermissionType = PermissionType.AdminSupplierMeasurementCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminSupplierMeasurementCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminSupplierMeasurementCanCreate;
  }

  ngOnInit(): void {
    if (this.detail) {
      this.fillSpcChartData(this.detail);
    }
  }

  getXBarRRuleData(event: any) {
    if (event.ruleType.length > 0) {
      this.isMavericLotDetectedForXBarR = true;
      event.ruleType.forEach((element, index) => {
        this.ruleNameForXBarR += chartRules[Number(element - 1)].name;
        if (index + 1 <= event.ruleType.length - 1) {
          this.ruleNameForXBarR += '\n';
        }
      });
      this.ruleNameForXBarR = this.ruleNameForXBarR.trim();
    }
    console.log(event);
  }
  getRangeXBarRRuleData(event: any) {

    if (event.ruleType.length > 0) {
      this.isMavericLotDetectedForRangeXBarR = true;
      event.ruleType.forEach((element, index) => {
        this.ruleNameForRangeXBarR += chartRules[Number(element - 1)].name + '\n';
        if (index + 1 <= event.ruleType.length - 1) {
          this.ruleNameForRangeXBarR += '\n';
        }
      });
      this.ruleNameForRangeXBarR = this.ruleNameForRangeXBarR.trim();
    }
    console.log(event);
  }
  getXBarSRuleData(event: any) {
    if (event.ruleType.length > 0) {
      this.isMavericLotDetectedForXBarS = true;
      event.ruleType.forEach((element, index) => {
        this.ruleNameForXBarS += chartRules[Number(element - 1)].name + '\n';
        if (index + 1 <= event.ruleType.length - 1) {
          this.ruleNameForXBarS += '\n';
        }
      });
      this.ruleNameForXBarS = this.ruleNameForXBarS.trim();
    }
    console.log(event);
  }
  getRangeXBarSRuleData(event: any) {
    if (event.ruleType.length > 0) {
      this.isMavericLotDetectedForRangeXBarS = true;
      event.ruleType.forEach((element, index) => {
        this.ruleNameForRangeXBarS += chartRules[Number(element - 1)].name + '\n';
        if (index + 1 <= event.ruleType.length - 1) {
          this.ruleNameForRangeXBarS += '\n';
        }
      });
      this.ruleNameForRangeXBarS = this.ruleNameForRangeXBarS.trim();
    }
    console.log(event);
  }

  getIMRRuleData(event: any) {
    if (event.ruleType.length > 0) {
      this.isMavericLotDetectedForIMR = true;
      event.ruleType.forEach((element, index) => {
        this.ruleNameForIMR += chartRules[Number(element - 1)].name;
        if (index + 1 <= event.ruleType.length - 1) {
          this.ruleNameForIMR += '\n';
        }
      });
      this.ruleNameForIMR = this.ruleNameForIMR.trim();
    }
    console.log(event);
  }

  getRangeIMRRuleData(event: any) {
    if (event.ruleType.length > 0) {
      this.isMavericLotDetectedForRangeIMR = true;
      event.ruleType.forEach((element, index) => {
        if (element !== undefined) {
          this.ruleNameForRangeIMR += chartRules[Number(element - 1)].name + '\n';
          if (index + 1 <= event.ruleType.length - 1) {
            this.ruleNameForRangeIMR += '\n';
          }
        }
      });
      this.ruleNameForRangeIMR = this.ruleNameForRangeIMR.trim();
    }
    console.log(event);
  }

  close() {
    this.activeModal.dismiss('Click X');
    this.closeClickedEvent.emit();
  }

  fillSpcChartData(detail) {
    if (this.detail.chartTypeId === ChartType.xBarR) {
      this.isXBarR = true;
      let finalValueXBarR;
      let smsNoStateForXBarR;
      let smsNoStateForRangeXBarR;
      let finalValueRangeXBarR;

      if (this.detail && this.detail.plotValues && this.detail.plotValues.length > 0) {
        const xBarRSMSData = this.detail.plotValues.filter(x => x.chartTypeId === ChartType.xBarR).sort((a, b) => a.createdDate > b.createdDate ? 1 : -1);
        const rangeXBarRSMSData = this.detail.plotValues.filter(x => x.chartTypeId === ChartType.RangeXBarR).sort((a, b) => a.createdDate > b.createdDate ? 1 : -1);

        if (xBarRSMSData) {
          finalValueXBarR = xBarRSMSData.map(x => parseFloat(x.finalTextValue.toFixed(detail.accuracy)));
          smsNoStateForXBarR = xBarRSMSData.map(x => x.smsNoState);
        }
        if (rangeXBarRSMSData) {
          smsNoStateForRangeXBarR = rangeXBarRSMSData.map(x => x.smsNoState);
          finalValueRangeXBarR = rangeXBarRSMSData.map(y => parseFloat(y.finalTextValue.toFixed(detail.accuracy)));
        }

      }
      this.FillXBarRChart(finalValueXBarR, smsNoStateForXBarR);

      this.FillChartParameters(finalValueXBarR, detail);

      // x-bar-r
      this.chartConfigXBarR.accuracy = detail.accuracy;
      this.chartConfigXBarR.lcl = detail.lcl !== undefined ? Number(detail.lcl.toFixed(detail.accuracy)) : 0;
      this.chartConfigXBarR.ucl = detail.ucl !== undefined ? Number(detail.ucl.toFixed(detail.accuracy)) : 0;
      this.chartConfigXBarR.pivot = detail.average25 !== undefined ? Number(detail.average25.toFixed(detail.accuracy)) : 0;
      // range x-bar-r
      this.chartConfigRangeXBarR.accuracy = detail.accuracy;
      this.chartConfigRangeXBarR.lcl = detail.rangeXBarLclR !== undefined ? Number(detail.rangeXBarLclR.toFixed(detail.accuracy)) : 0;
      this.chartConfigRangeXBarR.ucl = detail.rangeXBarUclR !== undefined ? Number(detail.rangeXBarUclR.toFixed(detail.accuracy)) : 0;
      this.chartConfigRangeXBarR.pivot = detail.rangeBarAverageFor30 !== undefined ? Number(detail.rangeBarAverageFor30.toFixed(detail.accuracy)) : 0;

      this.FillRangeXBarRChart(finalValueRangeXBarR, smsNoStateForRangeXBarR);

    } else if (this.detail.chartTypeId === ChartType.xBarS) {

      this.isXBarS = true;
      let finalValueXBarS;
      let smsNoStateForXBarS;
      let smsNoStateForRangeXBarS;
      let finalValueRangeXBarS;
      if (this.detail && this.detail.plotValues && this.detail.plotValues.length > 0) {
        const xBarSSMSData = this.detail.plotValues.filter(x => x.chartTypeId === ChartType.xBarS).sort((a, b) => a.createdDate > b.createdDate ? 1 : -1);
        if (xBarSSMSData) {
          finalValueXBarS = xBarSSMSData.map(x => parseFloat(x.finalTextValue.toFixed(detail.accuracy)));
          smsNoStateForXBarS = xBarSSMSData.map(x => x.smsNoState);
        }
      }

      const rangeXBarSSMSData = this.detail.plotValues.filter(x => x.chartTypeId === ChartType.RangeXBarS).sort((a, b) => a.createdDate > b.createdDate ? 1 : -1);
      this.FillXBarSChart(finalValueXBarS, smsNoStateForXBarS);
      this.FillChartParameters(finalValueXBarS, detail);
      // range x-bar-s
      this.chartConfigRangeXBarS.accuracy = detail.accuracy;
      this.chartConfigRangeXBarS.lcl = detail.rangeXBarSLclR !== undefined ? Number(detail.rangeXBarSLclR.toFixed(detail.accuracy)) : 0;
      this.chartConfigRangeXBarS.ucl = detail.rangeXBarSUclR !== undefined ? Number(detail.rangeXBarSUclR.toFixed(detail.accuracy)) : 0;
      this.chartConfigRangeXBarS.pivot = detail.rangeXBarSAverageFor30 !== undefined ? Number(detail.rangeXBarSAverageFor30.toFixed(detail.accuracy)) : 0;
      if (rangeXBarSSMSData) {
        smsNoStateForRangeXBarS = rangeXBarSSMSData.map(x => x.smsNoState);
        finalValueRangeXBarS = rangeXBarSSMSData.map(y => Number(y.finalTextValue.toFixed(detail.accuracy)));
      }
      this.FillRangeXBarSChart(finalValueRangeXBarS, smsNoStateForRangeXBarS);
      // x-bar-s
      this.chartConfigXBarS.accuracy = detail.accuracy;
      this.chartConfigXBarS.lcl = detail.xBarsLcl !== undefined ? Number(detail.xBarsLcl.toFixed(detail.accuracy)) : 0;
      this.chartConfigXBarS.ucl = detail.xBarSUcl !== undefined ? Number(detail.xBarSUcl.toFixed(detail.accuracy)) : 0;
      this.chartConfigXBarS.pivot = detail.average25 !== undefined ? Number(detail.average25.toFixed(detail.accuracy)) : 0;
    } else if (this.detail.chartTypeId === ChartType.IMR) {
      let plottedValueIMR;
      let smsNoStateForIMR;
      let smsNoStateForRangeIMR;
      let plottedValueForRangeIMR;
      this.isIMR = true;
      if (this.detail && this.detail.plotValues && this.detail.plotValues.length > 0) {
        const xBarRSMSData = this.detail.plotValues.filter(x => x.chartTypeId === ChartType.IMR);
        const rangeXBarRSMSData = this.detail.plotValues.filter(x => x.chartTypeId === ChartType.RangeIMR);
        if (xBarRSMSData) {
          plottedValueIMR = xBarRSMSData.map(x => parseFloat(x.finalTextValue.toFixed(detail.accuracy)));
          smsNoStateForIMR = xBarRSMSData.map(x => x.smsNoState);
        }
        if (rangeXBarRSMSData) {
          smsNoStateForRangeIMR = rangeXBarRSMSData.map(x => x.smsNoState);
          plottedValueForRangeIMR = rangeXBarRSMSData.map(y => parseFloat(y.finalTextValue.toFixed(detail.accuracy)));
        }
      }
      this.FillIMRChart(plottedValueIMR, smsNoStateForIMR);

      this.FillChartParameters(plottedValueIMR, detail);

      // IMR
      this.chartConfigIMR.accuracy = detail.accuracy;
      this.chartConfigIMR.lcl = detail.lcl !== undefined ? Number(detail.lcl.toFixed(detail.accuracy)) : 0;
      this.chartConfigIMR.ucl = detail.ucl !== undefined ? Number(detail.ucl.toFixed(detail.accuracy)) : 0;
      this.chartConfigIMR.pivot = detail.average25 !== undefined ? Number(detail.average25.toFixed(detail.accuracy)) : 0;

      // Range IMR
      this.chartConfigRangeIMR.accuracy = detail.accuracy;
      this.chartConfigRangeIMR.ucl = detail.rangeBarAverageFor25 !== undefined
        ? Number(detail.rangeBarAverageFor25.toFixed(detail.accuracy) * this.ucLRConstantForIMR) : 0;
      this.chartConfigRangeIMR.pivot = detail.rangeBarAverageFor25 !== undefined
        ? Number(detail.rangeBarAverageFor25.toFixed(detail.accuracy)) : 0;

      this.FillRangeIMRChart(plottedValueForRangeIMR, smsNoStateForRangeIMR);

    }
  }

  private FillRangeXBarRChart(finalValueRangeXBarR: any, smsNoStateForRangeXBarR: any) {
    const dataForRangeXBarR: any[] = [
      {
        label: 'Value (Average)',
        data: finalValueRangeXBarR,
        borderColor: '#084de0'
      }
    ];
    this.chartConfigRangeXBarR.data = {
      labels: smsNoStateForRangeXBarR,
      datasets: dataForRangeXBarR
    };
  }

  private FillRangeXBarSChart(finalValueRangeXBarS: any, smsNoStateForRangeXBarS: any) {
    const dataForRangeXBarS: any[] = [
      {
        label: 'Value (Average)',
        data: finalValueRangeXBarS,
        borderColor: '#084de0'
      }
    ];
    this.chartConfigRangeXBarS.data = {
      labels: smsNoStateForRangeXBarS,
      datasets: dataForRangeXBarS
    };
  }

  private FillChartParameters(finalValueXBarR: any, detail: any) {
    this.ipNo = this.ipNo;
    this.isInsufficientLot = finalValueXBarR.length >= 30 ? true : false;
    this.cpk = detail.cpk !== undefined ? detail.cpk ?? 0 : 0;
    this.nominal = detail.normalValue !== undefined ? detail.normalValue ?? 0 : 0;
    this.upper = detail.upperTolerance !== undefined ? detail.upperTolerance ?? 0 : 0;
    this.lower = detail.lowerTolerance !== undefined ? detail.lowerTolerance ?? 0 : 0;
    this.parameter = detail.parameterManagement.name;
  }

  private FillXBarRChart(finalValueXBarR: any, smsNoStateForXBarR: any) {
    const dataForXBarR: any[] = [
      {
        label: 'Value (Average)',
        data: finalValueXBarR,
        borderColor: '#084de0'
      }
    ];
    this.chartConfigXBarR.data = {
      labels: smsNoStateForXBarR,
      datasets: dataForXBarR
    };
  }


  private FillRangeIMRChart(plottedValueIMR: any, smsNoStateForRangeIMR: any) {
    const dataForRangeIMR: any[] = [
      {
        label: 'Value (Range Difference)',
        data: plottedValueIMR,
        borderColor: '#084de0'
      }
    ];
    this.chartConfigRangeIMR.data = {
      labels: smsNoStateForRangeIMR,
      datasets: dataForRangeIMR
    };
  }

  private FillXBarSChart(finalValueXBarS: any, smsNoStateForXBarS: any) {
    const dataForXBarS: any[] = [
      {
        label: 'Value (Average)',
        data: finalValueXBarS,
        borderColor: '#084de0'
      }
    ];
    this.chartConfigXBarS.data = {
      labels: smsNoStateForXBarS,
      datasets: dataForXBarS
    };
  }

  private FillIMRChart(plottedValuesForIMR: any, smsNoStateForIMR: any) {
    const dataForIMR: any[] = [
      {
        label: 'Value (Actual Value)',
        data: plottedValuesForIMR,
        borderColor: '#084de0'
      }
    ];
    this.chartConfigIMR.data = {
      labels: smsNoStateForIMR,
      datasets: dataForIMR
    };
  }
}
