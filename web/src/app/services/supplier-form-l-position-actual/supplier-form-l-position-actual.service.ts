/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddSupplierFormLPositionActualModel } from 'src/app/model/supplier-form-l-position-actual/add-supplier-form-l-position-actual-model';
import { SupplierFormLPositionActual } from 'src/app/model/supplier-form-l-position-actual/supplier-form-l-position-actual';
import { UpdateSupplierFormLPositionActualModel } from 'src/app/model/supplier-form-l-position-actual/update-supplier-form-l-position-actual-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';

@Injectable({
    providedIn: 'root'
})
export class SupplierFormLPositionActualService extends BaseDataService {
    private apiUrl = 'api/SupplierFormLPositionActual';
    private oDataUrl = 'odata/SupplierFormLPositionActual';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddSupplierFormLPositionActualModel): Observable<SupplierFormLPositionActual> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateSupplierFormLPositionActualModel): Observable<SupplierFormLPositionActual> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<SupplierFormLPositionActual> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SupplierFormLPositionActual>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<SupplierFormLPositionActual>(result);
        }));
    }

    getDataById(id: number): Observable<SupplierFormLPositionActual> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new SupplierFormLPositionActual());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<SupplierFormLPositionActual>> {
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
