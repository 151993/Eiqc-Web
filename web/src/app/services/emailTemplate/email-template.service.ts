/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailTemplate } from 'src/app/model/emailTemplate/email-template-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { UpdateEmailTemplateModel } from 'src/app/model/emailTemplate/update-email-template-model';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { ColumnType } from 'src/app/model/table/table';
import { Constants, SearchOperator } from 'src/app/shared/constant/global';
@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService extends BaseDataService {
  private apiUrl = 'api/EmailTemplate';
  private oDataUrl = 'odata/EmailTemplate';

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: EmailTemplate): Observable<EmailTemplate> {
    const url = `${this.apiUrl}`;
    return super.add(url, request);
  }

  updateData(id: number, request: UpdateEmailTemplateModel): Observable<EmailTemplate> {
    const url = `${this.apiUrl}/${id}`;
    return super.update(url, request);
  }

  deleteData(id: number, request: IDeleteModel): Observable<EmailTemplate> {
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

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<EmailTemplate>> {
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<EmailTemplate>(result);
    }));
  }

  getDataById(id: number): Observable<EmailTemplate> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new EmailTemplate());
  }

  searchByField(field: string, value: string): Observable<ApiResponse<EmailTemplate>> {
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
