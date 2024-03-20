
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddDateCodeModel } from 'src/app/model/date-code/add-date-code-model';
import { DateCode } from 'src/app/model/date-code/date-code';
import { UpdateDateCodeModel } from 'src/app/model/date-code/update-date-code-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';

@Injectable({
    providedIn: 'root'
})
export class DateCodeService extends BaseDataService {
    private apiUrl = 'api/DateCode';
    private oDataUrl = 'odata/DateCode';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddDateCodeModel): Observable<DateCode> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateDateCodeModel): Observable<DateCode> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<DateCode> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<DateCode>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<DateCode>(result);
        }));
    }

    getDataById(id: number): Observable<DateCode> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new DateCode());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<DateCode>> {
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
