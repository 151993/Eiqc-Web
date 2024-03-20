/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddTestReportModel } from 'src/app/model/test-report/add-test-report-model';
import { TestReport } from 'src/app/model/test-report/test-report';
import { UpdateTestReportModel } from 'src/app/model/test-report/update-test-report-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';

@Injectable({
    providedIn: 'root'
})
export class TestReportService extends BaseDataService {
    private apiUrl = 'api/TestReport';
    private oDataUrl = 'odata/TestReport';
    private oDataUrlByCommodity = 'odata/TestReport/GetTestReportByCommodity';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddTestReportModel): Observable<TestReport> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateTestReportModel): Observable<TestReport> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<TestReport> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<TestReport>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<TestReport>(result);
        }));
    }

    getDataById(id: number): Observable<TestReport> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new TestReport());
    }

    getDataByCommodityId(id: number): Observable<ApiResponse<TestReport[]>> {
        const url = `${this.oDataUrlByCommodity}(${'commodityId='}${id})`;
        return super.getListById(url, new TestReport());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<TestReport>> {
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
}
