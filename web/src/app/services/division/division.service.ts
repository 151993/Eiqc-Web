
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { ColumnType } from 'src/app/model/table/table';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { Division } from 'src/app/model/division/division';
import { AddDivisionModel } from 'src/app/model/division/add-division-model';
import { UpdateDivisionModel } from 'src/app/model/division/update-division-model';

@Injectable({
  providedIn: 'root'
})
export class DivisionService extends BaseDataService {
  private apiUrl = 'api/Division';
  private oDataUrl = 'odata/Division';

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: AddDivisionModel): Observable<Division> {
    const url = `${this.apiUrl}`;
    return super.add(url, request);
  }

  updateData(id: number, request: UpdateDivisionModel): Observable<Division> {
    const url = `${this.apiUrl}/${id}`;
    return super.update(url, request);
  }

  deleteData(id: number, request: IDeleteModel): Observable<Division> {
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

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<Division>> {
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<Division>(result);
    }));
  }

  getAllDataWithODataQuery(oDataQuery: string): Observable<ApiResponse<Division>> {
    const url = `${this.oDataUrl}?${oDataQuery}`;
    return super.get(url).pipe(map((result) => {
      return new ApiResponse<Division>(result);
    }));
  }

  getDataById(id: number): Observable<Division> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new Division());
  }

  searchByField(field: string, value: string): Observable<ApiResponse<Division>> {
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

  syncFromTM1(): Observable<boolean> {
    const url = `${this.apiUrl}/SyncDivisionFromTM1`;
    return super.get(url, undefined);
  }

  getTM1LastSyncDate(): Observable<any> {
    const url = `${this.apiUrl}/GetTM1LastSyncDate`;
    return super.get(url, undefined);
  }

}

