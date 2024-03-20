/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAutoComplete } from '../../base-auto-complete';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { environment } from 'src/environments/environment';
import { PurchaseOrderService } from 'src/app/services/purchase-order/purchase-order.service';
import { PurchaseOrder } from 'src/app/model/purchase-order/purchase-order';
import { ColumnType } from 'src/app/model/table/table';

export const CUSTOM_AUTOCOMPLETE_PURCHASEORDER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => JAutoCompletePurchaseOrderComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'j-auto-complete-purchase-order',
  templateUrl: './j-auto-complete-purchase-order.component.html',
  styleUrls: ['./j-auto-complete-purchase-order.component.css'],
  providers: [CUSTOM_AUTOCOMPLETE_PURCHASEORDER_CONTROL_VALUE_ACCESSOR]
})
export class JAutoCompletePurchaseOrderComponent extends BaseAutoComplete implements OnInit {
  @Input() site: string;
  @Input() vendorCode: string;
  @Input() partNo: string;
  partNumberColumn = 'PartNo';
  pageSortFilterInfo = new PageSortFilterInfo();
  purchaseOrderData: PurchaseOrder[] = [];
  constructor(
    private purchaseOrderService: PurchaseOrderService, // tslint:disable-line,
  ) {
    super(purchaseOrderService);
  }

  ngOnInit() {
    super.ngOnInit();
  }


  getData() {
    this.pageSortFilterInfo = new PageSortFilterInfo();
    if ((this.site && this.site !== Constants.Empty) && (this.vendorCode && this.vendorCode !== Constants.Empty)) {
      this.getFilterByColumnName(this.partNo, this.partNumberColumn, this.partNumberColumn, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, this.pageSortFilterInfo);
      this.purchaseOrderService.getPurchaseOrderSupplier(this.site, this.vendorCode, this.pageSortFilterInfo).subscribe((data) => {
        this.autoCompleteConfig.suggestions = data.value;
        this.data = data.value;
        this.purchaseOrderData = data.value;
      });
    }
  }



  search(event) {
    if (this.onCompleteMethod.observers.length === 0) {
      if (event.query.trim() !== Constants.Empty) {
        this.pageSortFilterInfo = new PageSortFilterInfo();
        if ((this.site && this.site !== Constants.Empty) && (this.vendorCode && this.vendorCode !== Constants.Empty)) {
          this.purchaseOrderService.
            getPurchaseOrderSupplier(this.site, this.vendorCode, this.pageSortFilterInfo)
            .subscribe(data => {
              this.autoCompleteConfig.suggestions = data.value.filter(x => x.partNo === this.partNo).splice(
                0,
                environment.limit.maxResult
              );
            });
        }
      }
    } else {
      this.onCompleteMethod.emit(event);
    }
  }

}
