
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddUserModel } from 'src/app/model/user/add-user-model';
import { User } from 'src/app/model/user/user';
import { UpdateUserModel } from 'src/app/model/user/update-user-model';
import { FilterInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';
import { Constants, LocalStorage, SearchOperator, UserType } from 'src/app/shared/constant/global';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseDataService {
  private apiUrl = 'api/User';
  private oDataUrl = 'odata/User';
  private columnName = 'userTypeId';
  Site = 'SiteId';

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: AddUserModel): Observable<User> {
    const url = `${this.apiUrl}`;
    return super.add(url, request);
  }

  updateData(id: number, request: UpdateUserModel): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return super.update(url, request);
  }

  deleteData(id: number, request: IDeleteModel): Observable<User> {
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

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<User>> {
    const url = `${this.oDataUrl}`;
    if (!pageSortFilterData) {
      pageSortFilterData = new PageSortFilterInfo();
    }

    if (pageSortFilterData.filterInfo.length === 0 || pageSortFilterData.filterInfo.find(x  => x.columnName === 'userTypeId' && x.value === UserType.Supplier) === undefined) {
      const supplierUserTypeFilterInfo = new FilterInfo();
      supplierUserTypeFilterInfo.columnName = this.columnName;
      supplierUserTypeFilterInfo.columnType = ColumnType.Number;
      supplierUserTypeFilterInfo.mappingField = '';
      supplierUserTypeFilterInfo.value = UserType.User;
      supplierUserTypeFilterInfo.operator = SearchOperator.IsEqualTo;
      pageSortFilterData.filterInfo.push(supplierUserTypeFilterInfo);
    }

    this.getFilterByColumnName(this.retrieveSite().id, this.Site, SearchOperator.IsEqualTo, ColumnType.StringWithoutLowerCase, pageSortFilterData, FilterCondition.And);

    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<User>(result);
    }));
  }

  /**
  * retrieves site data
  */
  retrieveSite() {
    const site = JSON.parse(localStorage.getItem(LocalStorage.Site));
    if (site) {
      return site;
    }
  }

  getAllDataWithODataQuery(oDataQuery: string): Observable<ApiResponse<User>> {
    const url = `${this.oDataUrl}?${oDataQuery}`;
    return super.get(url).pipe(map((result) => {
      return new ApiResponse<User>(result);
    }));
  }

  getDataById(id: number): Observable<User> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new User());
  }

  public searchBySamAccountOrName = (input: string): Observable<any> => {
    const url = `${this.apiUrl}/SearchBySamAccountOrName/${encodeURIComponent(input)}`;

    const options: IRequestOptions = {
      headers: this.headerWithoutLoading
    };

    return super.get(url, options);
  }

  searchByField(field: string, value: string): Observable<ApiResponse<User>> {
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
