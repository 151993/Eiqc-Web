
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddPartTestReportParameterModel } from 'src/app/model/part-test-report-parameter/add-part-test-report-parameter-model';
import { PartTestReportParameter } from 'src/app/model/part-test-report-parameter/part-test-report-parameter';
import { UpdatePartTestReportParameterModel } from 'src/app/model/part-test-report-parameter/update-part-test-report-parameter-model';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { PartTestReportTab } from 'src/app/model/part-test-report/part-test-report-tab-model';

@Injectable({
    providedIn: 'root'
})
export class PartTestReportParameterService extends BaseDataService {
    private apiUrl = 'api/PartTestReportParameter';
    private oDataUrl = 'odata/PartTestReportParameter';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddPartTestReportParameterModel): Observable<PartTestReportParameter> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdatePartTestReportParameterModel): Observable<PartTestReportParameter> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<PartTestReportParameter> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<PartTestReportParameter>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<PartTestReportParameter>(result);
        }));
    }

    getTestReportDataById(id: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<PartTestReportTab>> {
        const url = `${this.oDataUrl}(${id})`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
          return new ApiResponse<PartTestReportTab>(result);
        }));
      }

      getDataById(id: number): Observable<PartTestReportParameter> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new PartTestReportParameter());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<PartTestReportParameter>> {
        const url = `${this.oDataUrl}?$filter=contains(${field},'${encodeURIComponent(value)}')`;
        const options: IRequestOptions = {
            headers: this.headerWithoutLoading
        };
        return super.get(url, options).pipe(
            map(result => {
                return new ApiResponse(result);
            })
        );
    }

    expandTestReportParameterAttachment(): Record<string, ExpandSelectCountInfo>[] {
        return [
          {
            'partTestReportAttachments': <ExpandSelectCountInfo>{
              expand: <Record<string, ExpandSelectCountInfo>[]>[
                {
                  'attachment': <ExpandSelectCountInfo>{}
                }
              ]
            },
          },
        ];
      }
}
