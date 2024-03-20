/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddSupplierFormResultOrientedParameterModel } from 'src/app/model/supplier-form-result-oriented-parameter/add-supplier-form-result-oriented-parameter-model';
import { SupplierFormResultOrientedParameter } from 'src/app/model/supplier-form-result-oriented-parameter/supplier-form-result-oriented-parameter';
import { UpdateSupplierFormResultOrientedParameterModel } from 'src/app/model/supplier-form-result-oriented-parameter/update-supplier-form-result-oriented-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';

@Injectable({
    providedIn: 'root'
})
export class SupplierFormResultOrientedParameterService extends BaseDataService {
    private apiUrl = 'api/SupplierFormResultOrientedParameter';
    private oDataUrl = 'odata/SupplierFormResultOrientedParameter';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddSupplierFormResultOrientedParameterModel): Observable<SupplierFormResultOrientedParameter> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateSupplierFormResultOrientedParameterModel): Observable<SupplierFormResultOrientedParameter> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<SupplierFormResultOrientedParameter> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SupplierFormResultOrientedParameter>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<SupplierFormResultOrientedParameter>(result);
        }));
    }

    getDataById(id: number): Observable<SupplierFormResultOrientedParameter> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new SupplierFormResultOrientedParameter());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<SupplierFormResultOrientedParameter>> {
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
