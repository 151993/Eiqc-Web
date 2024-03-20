import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddParameterManagementModel } from 'src/app/model/parameter-management/add-parameter-management-model';
import { ParameterManagement } from 'src/app/model/parameter-management/parameter-management';
import { UpdateParameterManagementModel } from 'src/app/model/parameter-management/update-parameter-management-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';

@Injectable({
    providedIn: 'root'
})
export class ParameterManagementService extends BaseDataService {
    private apiUrl = 'api/ParameterManagement';
    private oDataUrl = 'odata/ParameterManagement';
    private oDataParameterManagementUrl = 'odata/ParameterManagement/GetParameterManagementDataByCommodityId';
    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddParameterManagementModel): Observable<ParameterManagement> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateParameterManagementModel): Observable<ParameterManagement> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<ParameterManagement> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<ParameterManagement>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<ParameterManagement>(result);
        }));
    }

    getParameterManagementDataByCommodityId(id: number, pcCodeList: any): Observable<ApiResponse<ParameterManagement[]>> {
        const url = `${this.oDataParameterManagementUrl}(${'commodityId='}${id},${'pcNames='}'${pcCodeList}')`;
        return super.getListById(url, new ParameterManagement());
    }

    getDataById(id: number): Observable<ParameterManagement> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new ParameterManagement());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<ParameterManagement>> {
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
