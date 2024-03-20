import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { IRequestOptions, WebHttpClient } from '../WebHttpClient';
import { map } from 'rxjs/operators';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { IBaseModel } from 'src/app/model/base/base-model';
import { AuthService } from 'src/app/auth/auth.service';
import { SampleSize } from 'src/app/model/sample-size/sample-size';

@Injectable({
  providedIn: 'root'
})
export class SampleSizeService extends BaseDataService {

  Site = 'SITE';
  private oDataUrl = 'odata/SAPSampleSize';

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

  deleteData(id: number, request: IDeleteModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }

  isAlreadyExists(field: string, name: string): Observable<boolean> {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.createFilter(name, field);
    pageSortFilterInfo.expandInfo = {
      select: ['id'],
    };

    return super.isExists(this.oDataUrl, pageSortFilterInfo);
  }

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SampleSize>> {
    this.getFilterByColumnName(this.GetSiteCode(), this.Site, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<SampleSize>(result);
    }));
  }



  getAllDataWithODataQuery(oDataQuery: string): Observable<ApiResponse<SampleSize>> {
    const url = `${this.oDataUrl}?${oDataQuery}`;
    return super.get(url).pipe(map((result) => {
      return new ApiResponse<SampleSize>(result);
    }));
  }

  getDataById(id: number): Observable<SampleSize> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new SampleSize());
  }

  searchByField(field: string, value: string): Observable<ApiResponse<SampleSize>> {
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

  GetSiteCode(): string {
    const code = this.authService.retrieveSite().code;
    return code;
  }

}
