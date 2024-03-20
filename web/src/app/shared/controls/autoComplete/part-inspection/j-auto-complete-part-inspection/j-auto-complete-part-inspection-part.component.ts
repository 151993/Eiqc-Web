/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../../base-auto-complete';
import { SAPPartInspectionPlanService } from 'src/app/services/sap-part-inspection-plan/sap-part-inspection-plan.service';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { environment } from 'src/environments/environment';
import { SAPPartInspectionPlan } from 'src/app/model/sap-part-inspection-plan/sap-part-inspection-plan';
import { ColumnType } from 'src/app/model/table/table';
import { SamplingPlan } from 'src/app/model/sampling-plan/sampling-plan';
import { AuthService } from 'src/app/auth/auth.service';
import { PurchaseOrder } from 'src/app/model/purchase-order/purchase-order';
import { SampleSize } from 'src/app/model/sample-size/sample-size';


export const CUSTOM_AUTOCOMPLETE_PARTINSPECTIONPART_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompletePartInspectionPartComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-part-inspection-part',
  templateUrl: './j-auto-complete-part-inspection-part.component.html',
  styleUrls: ['./j-auto-complete-part-inspection-part.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PARTINSPECTIONPART_CONTROL_VALUE_ACCESSOR]
})

export class JAutoCompletePartInspectionPartComponent extends BaseAutoComplete implements OnInit {
  @Input() supplierId: number;
  pageSortFilterInfo = new PageSortFilterInfo();
  partData: SAPPartInspectionPlan[];
  partNumberColumn = 'PART_NO';
  siteCodeColumn = 'SITE';
  vendorCodeColumn = 'VENDOR_CODE';

  site: any;
  user: any;
  constructor(
    private sapPartInspectionPlanService: SAPPartInspectionPlanService, // tslint:disable-line
    private _authService: AuthService
  ) {
    super(sapPartInspectionPlanService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
  getData() {
    this.site = this._authService.retrieveSite().code;
    this.user = this._authService.retrieveUser();
    this.pageSortFilterInfo = new PageSortFilterInfo();
    this.pageSortFilterInfo.expandInfo = this.expandRelatedData();
    if (this.supplierId > 0) {
      this.sapPartInspectionPlanService.getCompletelyApprovedIPPartNoForSupplier(this.supplierId, this.pageSortFilterInfo).subscribe((data) => {
        this.partData = data.value;
      }, () => { }, () => {
        this.filterPartNoFromSamplingPlan();
      });
    }
  }

  filterPartNoFromSamplingPlan() {
    const resultantPart: SAPPartInspectionPlan[] = [];
    this.partData.forEach((el: SAPPartInspectionPlan, index) => {
      this.pageSortFilterInfo = new PageSortFilterInfo();
      this.getFilterByColumnName(this.site, this.siteCodeColumn, this.siteCodeColumn, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo);
      this.getFilterByColumnName(el.partNo, this.partNumberColumn, this.partNumberColumn, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo);
      this.sapPartInspectionPlanService.checkPartNumberExistsInSamplingModule(this.pageSortFilterInfo).subscribe((samplingPlanData) => {
        this.data = [];
        if (samplingPlanData.value.length > 0) {
          samplingPlanData.value.forEach((element: SamplingPlan) => {
            const partNoExistingInSamplingPlan = this.partData.find(x => x.partNo === element.partNo && element.site === this.site);
            if (!resultantPart.find(k => k.partNo === element.partNo) && partNoExistingInSamplingPlan) {
              resultantPart.push(partNoExistingInSamplingPlan);
            }
          });
        }
        if (index === (this.partData.length - 1)) {
          // this.autoCompleteConfig.suggestions = resultantPart.splice(0, environment.limit.maxResult);
          // this.data = resultantPart;
        }
      }, () => { }, () => {
        let filterForVendorCodeExists;
        if (this.pageSortFilterInfo && this.pageSortFilterInfo.filterInfo) {
           filterForVendorCodeExists = this.pageSortFilterInfo.filterInfo.find(k => k.columnName === this.vendorCodeColumn);
        }
       if (!filterForVendorCodeExists) {
        this.getFilterByColumnName(this.user.supplier.vendorCode, this.vendorCodeColumn, this.vendorCodeColumn, SearchOperator.IsEqualTo,
          ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo);
       }
       if (this.pageSortFilterInfo.filterInfo !== undefined && this.pageSortFilterInfo.filterInfo.findIndex(info => info.columnName === 'partNo') > -1) {
        return;
       }
       const checkFilter = new PageSortFilterInfo();
       checkFilter.filterInfo = this.pageSortFilterInfo.filterInfo;
        this.sapPartInspectionPlanService.checkPartNumberExistsInPurchaseOrderModule(checkFilter).subscribe((purchaseOrderData) => {
          this.data = [];
          if (purchaseOrderData.value.length > 0) {
            purchaseOrderData.value.forEach((element: PurchaseOrder) => {
              const partNoExistingInPurChaseOrder = this.partData.find(x => x.partNo === element.partNo && element.site === this.site);
              if (!resultantPart.find(k => k.partNo === element.partNo) && partNoExistingInPurChaseOrder) {
                resultantPart.push(partNoExistingInPurChaseOrder);
              }
            });
          }
          if (index === (this.partData.length - 1)) {
            // this.autoCompleteConfig.suggestions = resultantPart.splice(0, environment.limit.maxResult);
            // this.data = resultantPart;
          }
        }, () => { }, () => {
          if (this.pageSortFilterInfo.filterInfo !== undefined && this.pageSortFilterInfo.filterInfo.findIndex(info => info.columnName === 'partNo') > -1) {
           return;
          }
          if (this.pageSortFilterInfo.filterInfo === undefined || this.pageSortFilterInfo.filterInfo.length === 0) {
            return;
          }
          const checkSampleFilter = new PageSortFilterInfo();
          checkSampleFilter.filterInfo = this.pageSortFilterInfo.filterInfo;
          this.sapPartInspectionPlanService.checkPartNumberExistsInSampleSizeCalculationModule(checkSampleFilter).subscribe((sampleSizeData) => {
            this.data = [];
            if (sampleSizeData.value.length > 0) {
              sampleSizeData.value.forEach((element: SampleSize) => {
                const partNoExistingInSampleSizeCalculation = this.partData.find(x => x.partNo === element.partNo && element.site === this.site);
                if (!resultantPart.find(k => k.partNo === element.partNo) && partNoExistingInSampleSizeCalculation) {
                  resultantPart.push(partNoExistingInSampleSizeCalculation);
                }
              });
            }
            if (index === (this.partData.length - 1)) {
              this.autoCompleteConfig.suggestions = resultantPart.splice(0, environment.limit.maxResult);
              this.data = resultantPart;
            }
          }, () => { }, () => {

          });
        });
      });
    });
  }

  expandRelatedData(): ExpandSelectCountInfo {
    return <ExpandSelectCountInfo>{
      expand: <Record<string, ExpandSelectCountInfo>[]>[
        this.sapPartInspectionPlanService.expandPartWorkCell(),
        this.sapPartInspectionPlanService.expandSupplier(),
        this.sapPartInspectionPlanService.expandSupplierContact(),
        this.sapPartInspectionPlanService.expandPartInspectionSamplingPlans(),
        this.sapPartInspectionPlanService.expandCommodity()
      ]
    };
  }

  search(event) {
    if (this.onCompleteMethod.observers.length === 0) {
      if (event.query.trim() !== Constants.Empty) {
        if (this.supplierId > 0) {
          this.pageSortFilterInfo = new PageSortFilterInfo();
          this.pageSortFilterInfo.expandInfo = this.expandRelatedData();
          this.getFilterByColumnName(event.query.trim(), this.autoCompleteConfig.mappingField, `tolower(${this.autoCompleteConfig.mappingField})`,
            SearchOperator.Contains, ColumnType.String, this.pageSortFilterInfo);
          this.sapPartInspectionPlanService.
            getCompletelyApprovedIPPartNoForSupplier(this.supplierId, this.pageSortFilterInfo)
            .subscribe(data => {
              this.partData = data.value;
            }, () => { }, () => {
              this.filterPartNoFromSamplingPlan();
            });
        }
      }
    } else {
      this.onCompleteMethod.emit(event);
    }
  }
}
