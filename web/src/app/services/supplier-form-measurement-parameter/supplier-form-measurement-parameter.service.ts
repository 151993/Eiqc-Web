/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddSupplierFormMeasurementParameterModel } from 'src/app/model/supplier-form-measurement-parameter/add-supplier-form-measurement-parameter-model';
import { SupplierFormMeasurementParameter } from 'src/app/model/supplier-form-measurement-parameter/supplier-form-measurement-parameter';
import { UpdateSupplierFormMeasurementParameterModel } from 'src/app/model/supplier-form-measurement-parameter/update-supplier-form-measurement-parameter-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';

@Injectable({
    providedIn: 'root'
})
export class SupplierFormMeasurementParameterService extends BaseDataService {
    private apiUrl = 'api/SupplierFormMeasurementParameter';
    private oDataUrl = 'odata/SupplierFormMeasurementParameter';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddSupplierFormMeasurementParameterModel): Observable<SupplierFormMeasurementParameter> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateSupplierFormMeasurementParameterModel): Observable<SupplierFormMeasurementParameter> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<SupplierFormMeasurementParameter> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<SupplierFormMeasurementParameter>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<SupplierFormMeasurementParameter>(result);
        }));
    }

    getDataById(id: number): Observable<SupplierFormMeasurementParameter> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new SupplierFormMeasurementParameter());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<SupplierFormMeasurementParameter>> {
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
