import { WebHttpClient, IRequestOptions } from '../../services/WebHttpClient';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CustomHeader, AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { map } from 'rxjs/operators';
import { PageSortFilterInfo } from '../odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from '../odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { IReflection } from '../reflection/reflection';

export class BaseService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  headerWithoutLoading = this.headers.set(CustomHeader.SkipLoadingHeader, '');

  constructor(protected http: WebHttpClient, protected odataQueryBuilderService: OdataQueryBuilderService) {

  }

  protected add(url: string, request: any): Observable<any> {
    return this.http.post<any>(url, request);
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

  protected isExists(url: string): Observable<boolean> {
    const options: any = {
      headers: this.headerWithoutLoading
    };

    return this.http.get<any>(url, options).pipe(
      map(result => {
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
}
