import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { IBaseModel } from 'src/app/model/base/base-model';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { MaterialGroup } from 'src/app/model/material-group/material-group';
import { ColumnType } from 'src/app/model/table/table';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { IRequestOptions, WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root'
})
export class MaterialGroupService extends BaseDataService {

  private apiUrl = 'api/MaterialGroup';
  private oDataUrl = 'odata/MaterialGroup';
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
  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
  ) {
    super(http, odataQueryBuilderService);
  }

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<MaterialGroup>> {
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<MaterialGroup>(result);
    }));
  }

  getAllDataWithODataQuery(oDataQuery: string): Observable<ApiResponse<MaterialGroup>> {
    const url = `${this.oDataUrl}?${oDataQuery}`;
    return super.get(url).pipe(map((result) => {
      return new ApiResponse<MaterialGroup>(result);
    }));
  }

  getDataById(id: number): Observable<MaterialGroup> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new MaterialGroup());
  }

  searchByField(field: string, value: string): Observable<ApiResponse<MaterialGroup>> {
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

  syncFromSAP(): Observable<boolean> {
    const url = `${this.apiUrl}/SyncMaterialGroupFromSAP`;
    return super.get(url, undefined);
  }

  getSAPLastSyncDate(): Observable<any> {
    const url = `${this.apiUrl}/GetSAPLastSyncDate`;
    return super.get(url, undefined);
  }

}
