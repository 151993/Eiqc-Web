import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { AddCountryModel } from 'src/app/model/country/add-country-model';
import { Country } from 'src/app/model/country/country';
import { IDeleteCountryModel } from 'src/app/model/country/delete-country-model';
import { UpdateCountryModel } from 'src/app/model/country/update-country-model';
import { ColumnType } from 'src/app/model/table/table';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { IRequestOptions, WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseDataService {
  private apiUrl = 'api/Country';
  private oDataUrl = 'odata/Country';

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: AddCountryModel): Observable<Country> {
    const url = `${this.apiUrl}`;
    return super.add(url, request);
  }

  updateData(id: number, request: UpdateCountryModel): Observable<Country> {
    const url = `${this.apiUrl}/${id}`;
    return super.update(url, request);
  }

  deleteData(id: number, request: IDeleteCountryModel): Observable<Country> {
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

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<Country>> {
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<Country>(result);
    }));
  }

  getAllDataWithODataQuery(oDataQuery: string): Observable<ApiResponse<Country>> {
    const url = `${this.oDataUrl}?${oDataQuery}`;
    return super.get(url).pipe(map((result) => {
      return new ApiResponse<Country>(result);
    }));
  }

  getDataById(id: number): Observable<Country> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new Country());
  }

  searchByField(field: string, value: string): Observable<ApiResponse<Country>> {
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
