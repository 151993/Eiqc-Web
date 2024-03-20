/* Auto Generated Code By AutoCodeGen Jabil © 2019 */



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddDefectManagementModel } from 'src/app/model/defect-management/add-defect-management-model';
import { DefectManagement } from 'src/app/model/defect-management/defect-management';
import { UpdateDefectManagementModel } from 'src/app/model/defect-management/update-defect-management-model';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { DefectType } from 'src/app/model/defect-type/defect-type';

@Injectable({
    providedIn: 'root'
})
export class DefectTypeService extends BaseDataService {
    private apiUrl = 'api/DefectType';
    private oDataUrl = 'odata/DefectType';
    private defectTypeNameBySection = 'odata/DefectType/GetDefectTypeNameBySection';


    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddDefectManagementModel): Observable<DefectManagement> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateDefectManagementModel): Observable<DefectManagement> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<DefectManagement> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<DefectType>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<DefectType>(result);
        }));
    }

    getDataById(id: number): Observable<DefectManagement> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new DefectManagement());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<DefectManagement>> {
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

    getDefectTypeNameBySection(defectSectionId: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<DefectType>> {
        const url = `${this.defectTypeNameBySection}(${'defectSectionId='}${defectSectionId})`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
          return new ApiResponse<DefectType>(result);
        }));
      }

    expandDefectType(): Record<string, ExpandSelectCountInfo> {
        return {
          'defectTypes': <ExpandSelectCountInfo>{
          }
        };
      }
}
