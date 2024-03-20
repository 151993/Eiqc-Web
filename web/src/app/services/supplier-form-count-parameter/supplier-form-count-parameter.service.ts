/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddSupplierFormCountParameterModel } from 'src/app/model/supplier-form-count-parameter/add-supplier-form-count-parameter-model';
import { SupplierFormCountParameter } from 'src/app/model/supplier-form-count-parameter/supplier-form-count-parameter';
import { UpdateSupplierFormCountParameterModel } from 'src/app/model/supplier-form-count-parameter/update-supplier-form-count-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';

@Injectable({
    providedIn: 'root'
})
export class SupplierFormCountParameterService extends BaseDataService {
    private apiUrl = 'api/SupplierFormCountParameter';
    private oDataUrl = 'odata/SupplierFormCountParameter';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddSupplierFormCountParameterModel): Observable<SupplierFormCountParameter> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateSupplierFormCountParameterModel): Observable<SupplierFormCountParameter> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<SupplierFormCountParameter> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SupplierFormCountParameter>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<SupplierFormCountParameter>(result);
        }));
    }

    getDataById(id: number): Observable<SupplierFormCountParameter> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new SupplierFormCountParameter());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<SupplierFormCountParameter>> {
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
