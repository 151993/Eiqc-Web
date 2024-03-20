import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AuditLogEntityTypes, Constants, SearchOperator } from 'src/app/shared/constant/global';
import { AuditLog } from 'src/app/model/audit-log/audit-log';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IBaseModel } from 'src/app/model/base/base-model';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { ColumnType } from 'src/app/model/table/table';

@Injectable()
export class AuditLogService extends BaseDataService {
  private oDataUrl = 'odata/AuditLog';

  public getAuditLogByEntityId$ = new Subject();

  constructor(http: WebHttpClient, odataQueryBuilderService: OdataQueryBuilderService) {
    super(http, odataQueryBuilderService);
  }

  addData(request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }

  updateData(id: number, request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }

  deleteData(id: number, request: IDeleteModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }

  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<IBaseModel>> {
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<AuditLog>(result);
    }));

  }

  getAuditLogByEntityId(id: number, entityType: AuditLogEntityTypes, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<IBaseModel>> {
    const url = `odata/AuditLog(${id})`;
    return super.get(url, undefined, pageSortFilterData, entityType).pipe(map((result) => {
      return new ApiResponse<AuditLog>(result);
    }));
  }

  searchByField(field: string, value: string): Observable<ApiResponse<IBaseModel>> {
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

}
