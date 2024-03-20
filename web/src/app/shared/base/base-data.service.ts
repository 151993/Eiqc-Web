import { WebHttpClient, IRequestOptions } from '../../services/WebHttpClient';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CustomHeader, AuditLogEntityTypes, SearchOperator } from 'src/app/shared/constant/global';
import { map } from 'rxjs/operators';
import { FilterInfo, PageSortFilterInfo } from '../odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from '../odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { IBaseModel } from 'src/app/model/base/base-model';
import { IReflection } from '../reflection/reflection';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { ColumnType, FilterCondition } from 'src/app/model/table/table';

export abstract class BaseDataService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  headerWithoutLoading = this.headers.set(CustomHeader.SkipLoadingHeader, '');

  constructor(protected http: WebHttpClient, protected odataQueryBuilderService: OdataQueryBuilderService) {

  }

  abstract addData(request: IBaseModel): Observable<IBaseModel>;

  abstract updateData(id: number, request: IBaseModel): Observable<IBaseModel>;

  abstract deleteData(id: number, request: IDeleteModel): Observable<IBaseModel>;

  abstract isAlreadyExists(field: string, name: string): Observable<boolean>;

  abstract getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<IBaseModel>>;

  abstract searchByField(field: string, name: string): Observable<ApiResponse<IBaseModel>>;

  protected add(url: string, request: any, options?: IRequestOptions): Observable<any> {
    if (options != null) {
      return this.http.post<any>(url, request, options);
    } else {
      return this.http.post<any>(url, request);
    }
  }

  protected update(url: string, request: any): Observable<any> {
    return this.http.put<any>(url, request);
  }

  protected delete(url: string, request: any): Observable<any> {
    const content = JSON.stringify(request);

    const options: IRequestOptions = {
      body: content,
      headers: this.headers
    };

    return this.http.delete<any>(url, options);
  }

  protected isNameExists(url: string): Observable<boolean> {
    const options: any = {
      headers: this.headerWithoutLoading
    };

    return this.http.get<any>(url, options).pipe(
      map(result => {
        if (result['value'].length > 0) {
          return true;
        }
        return false;
      })
    );
  }

  protected isExists(
    url: string,
    pageSortFilterData?: PageSortFilterInfo,
  ): Observable<boolean> {
    const options: any = {
      headers: this.headerWithoutLoading,
    };

    return this.get(url, options, pageSortFilterData).pipe(
      map((result) => {
        return new ApiResponse(result).value.length > 0;
      })
    );
  }

  protected get(url: string, options?: IRequestOptions,
    pageSortFilterData?: PageSortFilterInfo,
    entityType?: AuditLogEntityTypes): Observable<any> {

    if (pageSortFilterData) {
      url = url + this.odataQueryBuilderService.getQueryFromPageSortFilterInfo(pageSortFilterData, entityType);
    }

    if (options != null) {
      return this.http.get<any>(url, options);
    }
    return this.http.get<any[]>(url);
  }

  protected getById(url: string, entity?: IReflection): Observable<any> {
    if (entity) {
      url = url + this.odataQueryBuilderService.getQueryFromPageSortFilterInfo(new PageSortFilterInfo(entity));
    }
    return this.http.get<any[]>(url).pipe(
      map(result => {
        return new ApiResponse(result).value[0];
      })
    );
  }
  protected getListById(url: string, entity?: IReflection): Observable<any> {
    if (entity) {
      url = url + this.odataQueryBuilderService.getQueryFromPageSortFilterInfo(new PageSortFilterInfo(entity));
    }
    return this.http.get<any[]>(url).pipe(
      map(result => {
        return result;
      })
    );
  }

  getFilterByColumnName(value: any, mappingField, operator: SearchOperator, columnType: ColumnType, pageSortFilterInfo: PageSortFilterInfo,
      filterCondition?: FilterCondition,  globalFilterCondition?: FilterCondition) {
        if (pageSortFilterInfo.filterInfo.findIndex(obj => obj.columnName === mappingField &&
          obj.columnType === obj.columnType &&
          obj.value === value &&
          obj.filterCondition === filterCondition &&
          obj.mappingField === mappingField &&
          obj.operator === operator) > -1) {
          return;
        }
    const filterInfo = new FilterInfo();
    filterInfo.columnName = mappingField;
    filterInfo.columnType = columnType;
    filterInfo.mappingField = mappingField;
    filterInfo.value = value;
    filterInfo.operator = operator;
    filterInfo.filterCondition = filterCondition;
    pageSortFilterInfo.filterInfo.push(filterInfo);
    pageSortFilterInfo.globalFilterCondition = globalFilterCondition;
}
}
