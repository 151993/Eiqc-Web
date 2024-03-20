import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { AddCommodityModel } from 'src/app/model/commodity/add-commodity-model';
import { Commodity } from 'src/app/model/commodity/commodity';
import { UpdateCommodityModel } from 'src/app/model/commodity/update-commodity-model';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { IRequestOptions, WebHttpClient } from '../WebHttpClient';
import { map } from 'rxjs/operators';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommodityService extends BaseDataService {

  private apiUrl = 'api/Commodity';
  private oDataUrl = 'odata/Commodity';
  Site = 'SiteNo';

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
    private _authService: AuthService
  ) {
    super(http, odataQueryBuilderService);
  }
  addData(request: AddCommodityModel): Observable<Commodity> {
    const url = `${this.apiUrl}`;
    return super.add(url, request);
  }

  updateData(id: number, request: UpdateCommodityModel): Observable<Commodity> {
    const url = `${this.apiUrl}/${id}`;
    return super.update(url, request);
  }

  deleteData(id: number, request: IDeleteModel): Observable<Commodity> {
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

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<Commodity>> {
    const url = `${this.oDataUrl}`;
    // this.getFilterByColumnName(this._authService.retrieveSite().code, this.Site, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData,  FilterCondition.And);
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<Commodity>(result);
    }));
  }

  getAllDataWithPartAndSite(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<Commodity>> {
    const url = `${this.oDataUrl}/GetCommoditiesWithPartAndSite`;
    if (pageSortFilterData === undefined) {
      pageSortFilterData = new PageSortFilterInfo();
    }
    this.getFilterByColumnName(this._authService.retrieveSite().code, this.Site, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      pageSortFilterData.filterInfo = [];
      return new ApiResponse<Commodity>(result);
    }));
  }


  getAllDataWithPartAndSiteForExport(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<Commodity>> {
    const url = `${this.oDataUrl}/GetCommoditiesWithPartAndSiteForExport`;
    if (pageSortFilterData === undefined) {
      pageSortFilterData = new PageSortFilterInfo();
    }
    this.getFilterByColumnName(this._authService.retrieveSite().code, this.Site, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      pageSortFilterData.filterInfo = [];
      return new ApiResponse<Commodity>(result);
    }));
  }

  getAllDataWithODataQuery(oDataQuery: string): Observable<ApiResponse<Commodity>> {
    const url = `${this.oDataUrl}?${oDataQuery}`;
    return super.get(url).pipe(map((result) => {
      return new ApiResponse<Commodity>(result);
    }));
  }

  getDataById(id: number): Observable<Commodity> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new Commodity());
  }

  searchByField(field: string, value: string): Observable<ApiResponse<Commodity>> {
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

}
