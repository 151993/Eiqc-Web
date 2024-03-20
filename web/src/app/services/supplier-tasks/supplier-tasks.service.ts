import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { IBaseModel } from 'src/app/model/base/base-model';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { SupplierTasks } from 'src/app/model/supplier-tasks/supplier-tasks';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { SearchOperator } from 'src/app/shared/constant/global';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { IRequestOptions, WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root'
})
export class SupplierTasksService extends BaseDataService {

  private oDataUrl = 'oData/SAPPartInspectionPlan';
  Site = 'Ip';
  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
    private _authService: AuthService,
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }
  // updateData(id: number, request: ApproveRejectSAPPartInspectionPlanModel): Observable<SAPPartInspectionPlan> {
  //     const url = `${this.apiUrl}/ApproveReject/${id}`;
  //     return super.update(url, request);
  // }
  deleteData(id: number, request: IDeleteModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SupplierTasks>> {
    const url = `${this.oDataUrl}`;

    if (pageSortFilterData === undefined) {
      pageSortFilterData = new PageSortFilterInfo();
    }
    this.getFilterByColumnName(this._authService.retrieveSite().code, this.Site, SearchOperator.StartsWith, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);

    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      pageSortFilterData.filterInfo = [];
      return new ApiResponse<SupplierTasks>(result);
    }));
  }

  getDataById(id: number): Observable<SupplierTasks> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new SupplierTasks());
  }

  updateData(id: number, request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }

  searchByField(field: string, value: string): Observable<ApiResponse<SupplierTasks>> {
    const url = `${this.oDataUrl}?$filter=contains(${field},'${encodeURIComponent(value)}')`;
    const options: IRequestOptions = {
      headers: this.headerWithoutLoading
    };
    return super.get(url, options).pipe(
      map(result => {
        return new ApiResponse(result);
      })
    );
  }
}
