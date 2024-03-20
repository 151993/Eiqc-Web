import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddParameterTypeCodeModel } from 'src/app/model/parameter-type-code/add-parameter-type-code-model';
import { ParameterTypeCode } from 'src/app/model/parameter-type-code/parameter-type-code';
import { UpdateParameterTypeCodeModel } from 'src/app/model/parameter-type-code/update-parameter-type-code-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';

@Injectable({
    providedIn: 'root'
})
export class ParameterTypeCodeService extends BaseDataService {
    private apiUrl = 'api/ParameterTypeCode';
    private oDataUrl = 'odata/ParameterTypeCode';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddParameterTypeCodeModel): Observable<ParameterTypeCode> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateParameterTypeCodeModel): Observable<ParameterTypeCode> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<ParameterTypeCode> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<ParameterTypeCode>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<ParameterTypeCode>(result);
        }));
    }

    getParameterTypeData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<ParameterTypeCode>> {
        const url = `${this.oDataUrl}?$count=true&$expand=parameterManagementType`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<ParameterTypeCode>(result);
        }));
    }

    getDataById(id: number): Observable<ParameterTypeCode> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new ParameterTypeCode());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<ParameterTypeCode>> {
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
