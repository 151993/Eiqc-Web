import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { PurchaseOrder } from 'src/app/model/purchase-order/purchase-order';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { IRequestOptions, WebHttpClient } from '../WebHttpClient';
import { map } from 'rxjs/operators';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { IBaseModel } from 'src/app/model/base/base-model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends BaseDataService {

  Site = 'Site';
  private apiUrl = 'api/PurchaseOrder';
  private oDataUrl = 'odata/PurchaseOrder';
  private oDataPurchaseOrderSupplierUrl = 'odata/PurchaseOrder/GetPurchaseOrderForSupplier';
  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
    protected authService: AuthService
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }
  updateData(id: number, request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }

  deleteData(id: number, request: IDeleteModel): Observable<PurchaseOrder> {
    const url = `${this.apiUrl}/${id}`;
    return super.delete(url, request);
  }

  isAlreadyExists(field: string, name: string): Observable<boolean> {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.createFilter(name, field);
    pageSortFilterInfo.expandInfo = {
      select: ['id'],
    };

    return super.isExists(this.oDataUrl, pageSortFilterInfo);
  }

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<PurchaseOrder>> {
    this.getFilterByColumnName(this.GetSiteCode(), this.Site, SearchOperator.Contains, ColumnType.StringWithoutLowerCase,
      pageSortFilterData, FilterCondition.And);
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<PurchaseOrder>(result);
    }));
  }

  getPurchaseOrderSupplier(site: string, vendorCode: string, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<PurchaseOrder>> {
    const url = `${this.oDataPurchaseOrderSupplierUrl}(${'site='}'${site}',${'vendorCode='}'${vendorCode}')`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<PurchaseOrder>(result);
    }));
  }

  getAllDataWithODataQuery(oDataQuery: string): Observable<ApiResponse<PurchaseOrder>> {
    const url = `${this.oDataUrl}?${oDataQuery}`;
    return super.get(url).pipe(map((result) => {
      return new ApiResponse<PurchaseOrder>(result);
    }));
  }

  getDataById(id: number): Observable<PurchaseOrder> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new PurchaseOrder());
  }

  searchByField(field: string, value: string): Observable<ApiResponse<PurchaseOrder>> {
    const pageSortFilterInfo = new PageSortFilterInfo();
    const options: IRequestOptions = {
      headers: this.headerWithoutLoading,
    };

    pageSortFilterInfo.createFilter(value, field, ColumnType.String, Constants.Empty, SearchOperator.Contains);

    return super.get(this.oDataUrl, options, pageSortFilterInfo).pipe(
      map((result) => {
        return new ApiResponse(result);
      })
    );
  }

  getSAPLastSyncDate(): Observable<any> {
    const url = `${this.apiUrl}/GetSAPLastSyncDate`;
    return super.get(url, undefined);
  }

  syncFromSAPData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<PurchaseOrder>> {
    const url = `${this.oDataUrl}/SyncPurchaseOrderFromSAP`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<PurchaseOrder>(result);
    }));
  }


  GetSiteCode(): string {
    const code = this.authService.retrieveSite().code;
    return code;

  }

}
