
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { ColumnType } from 'src/app/model/table/table';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { AddLocationModel } from 'src/app/model/location/add-location-model';
import { UpdateLocationModel } from 'src/app/model/location/update-location-model';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import {Location } from 'src/app/model/location/location';
@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseDataService {
  private apiUrl = 'api/Location';
  private oDataUrl = 'odata/Location';

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: AddLocationModel): Observable<Location> {
    const url = `${this.apiUrl}`;
    return super.add(url, request);
  }

  updateData(id: number, request: UpdateLocationModel): Observable<Location> {
    const url = `${this.apiUrl}/${id}`;
    return super.update(url, request);
  }

  deleteData(id: number, request: IDeleteModel): Observable<Location> {
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

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<Location>> {
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<Location>(result);
    }));
  }

  getAllDataWithODataQuery(oDataQuery: string): Observable<ApiResponse<Location>> {
    const url = `${this.oDataUrl}?${oDataQuery}`;
    return super.get(url).pipe(map((result) => {
      return new ApiResponse<Location>(result);
    }));
  }

  getDataById(id: number): Observable<Location> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new Location());
  }

  searchByField(field: string, value: string): Observable<ApiResponse<Location>> {
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

