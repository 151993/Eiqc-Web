
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { PartSpecModel } from 'src/app/model/sap-part-inspection-plan/part-spec-model';
import { IBaseModel } from 'src/app/model/base/base-model';

@Injectable({
  providedIn: 'root'
})
export class PartSpecificationService extends BaseDataService {

  private oDataUrl = 'odata/PartInspectionSpecification';

  addData(request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }
  updateData(id: number, request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }
  deleteData(id: number, request: IDeleteModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
  ) {
    super(http, odataQueryBuilderService);
  }

  isAlreadyExists(field: string, name: string): Observable<boolean> {
    const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
    return super.isExists(url);
  }

  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<PartSpecModel>> {
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<PartSpecModel>(result);
    }));
  }

  getSpecDataById(id: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<PartSpecModel>> {
    const url = `${this.oDataUrl}(${id})`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<PartSpecModel>(result);
    }));
  }

  getDataById(id: number): Observable<PartSpecModel> {
    const url = `${this.oDataUrl}(${id})`;
    return super.getById(url, new PartSpecModel());
  }

  searchByField(field: string, value: string): Observable<ApiResponse<PartSpecModel>> {
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

  expandPartInspectionSpecAttachment(): Record<string, ExpandSelectCountInfo>[] {
    return [
      {
        'partInspectionSpecAttachments': <ExpandSelectCountInfo>{
          expand: <Record<string, ExpandSelectCountInfo>[]>[
            {
              'attachment': <ExpandSelectCountInfo>{}
            }
          ]
        },
      },
    ];
  }
}
