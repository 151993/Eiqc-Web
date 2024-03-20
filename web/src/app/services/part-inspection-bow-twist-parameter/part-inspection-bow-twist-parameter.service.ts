/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { PartInspectionBowTwistParameter } from 'src/app/model/part-inspection-bow-twist-parameter/part-inspection-bow-twist-parameter';
import { UpdatePartInspectionBowTwistParameterModel } from 'src/app/model/part-inspection-bow-twist-parameter/update-part-inspection-bow-twist-parameter-model';
import { AddPartInspectionBowTwistParameterModel } from 'src/app/model/part-inspection-bow-twist-parameter/add-part-inspection-bow-twist-parameter-model';

@Injectable({
    providedIn: 'root'
})
export class PartInspectionBowTwistParameterService extends BaseDataService {
    private apiUrl = 'api/PartInspectionBowTwistParameter';
    private oDataUrl = 'odata/PartInspectionBowTwistParameter';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddPartInspectionBowTwistParameterModel): Observable<PartInspectionBowTwistParameter> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdatePartInspectionBowTwistParameterModel): Observable<PartInspectionBowTwistParameter> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<PartInspectionBowTwistParameter> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<PartInspectionBowTwistParameter>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<PartInspectionBowTwistParameter>(result);
        }));
    }

    getDataById(id: number): Observable<PartInspectionBowTwistParameter> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new PartInspectionBowTwistParameter());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<PartInspectionBowTwistParameter>> {
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
