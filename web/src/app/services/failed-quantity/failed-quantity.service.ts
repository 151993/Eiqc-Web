import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { FailedQuantity } from 'src/app/model/failed-quantity/failed-quantity';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { WebHttpClient } from '../WebHttpClient';
import { map } from 'rxjs/operators';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { IBaseModel } from 'src/app/model/base/base-model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FailedQuantityService extends BaseDataService {

  private oDataFailedQuantitySupplierUrl = 'odata/SupplierFailedQuantity/GetFailedQuantityDataForSupplier';

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService,
    protected authService: AuthService
  ) {
    super(http, odataQueryBuilderService);
  }

  deleteData(id: number, request: IDeleteModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<IBaseModel>> {
    throw new Error('Method not implemented.');
  }
  searchByField(field: string, name: string): Observable<ApiResponse<IBaseModel>> {
    throw new Error('Method not implemented.');
  }
  addData(request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }
  updateData(id: number, request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }

  getFailedQuantityDataForSupplier(SMSId: number, pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<FailedQuantity>> {
    const url = `${this.oDataFailedQuantitySupplierUrl}(${'SMSId='}${SMSId})`;
    return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
      return new ApiResponse<FailedQuantity>(result);
    }));
  }

}
