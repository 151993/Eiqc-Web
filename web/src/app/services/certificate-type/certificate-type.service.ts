/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddCertificateTypeModel } from 'src/app/model/certificate-type/add-certificate-type-model';
import { CertificateType } from 'src/app/model/certificate-type/certificate-type';
import { UpdateCertificateTypeModel } from 'src/app/model/certificate-type/update-certificate-type-model';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';

@Injectable({
    providedIn: 'root'
})
export class CertificateTypeService extends BaseDataService {
    private apiUrl = 'api/CertificateType';
    private oDataUrl = 'odata/CertificateType';

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddCertificateTypeModel): Observable<CertificateType> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateCertificateTypeModel): Observable<CertificateType> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<CertificateType> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<CertificateType>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<CertificateType>(result);
        }));
    }

    getDataById(id: number): Observable<CertificateType> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new CertificateType());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<CertificateType>> {
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

    expandCertificateTypeParameters(): Record<string, ExpandSelectCountInfo> {
        return {
          'certificateTypeParameters': <ExpandSelectCountInfo>{
          }
        };
      }
}
