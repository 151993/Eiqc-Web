import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { IBaseModel } from 'src/app/model/base/base-model';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { IRequestOptions, WebHttpClient } from '../WebHttpClient';
import { AppearanceInspection } from 'src/app/model/commodity/appearance-inspection';
import { map } from 'rxjs/operators';
import { ColumnType } from 'src/app/model/table/table';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
@Injectable({
  providedIn: 'root'
})
export class AppearanceInspectionService extends BaseDataService {
  private oDataUrl = 'odata/InspectionItems';
  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService
  ) {
    super(http, odataQueryBuilderService);
  }

  getAllData(
    pageSortFilterData?: PageSortFilterInfo
  ): Observable<ApiResponse<AppearanceInspection>> {
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(
      map(result => {
        return new ApiResponse<AppearanceInspection>(result);
      })
    );
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
  searchByField(field: string, value: string): Observable<ApiResponse<AppearanceInspection>> {
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
