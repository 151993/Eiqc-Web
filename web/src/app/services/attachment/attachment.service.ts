/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { HttpHeaders } from '@angular/common/http';
import { CustomHeader, Constants, SearchOperator } from 'src/app/shared/constant/global';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddAttachmentModel } from 'src/app/model/attachment/add-attachment';
import { Attachment } from 'src/app/model/attachment/attachment';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { DownloadAttachmentModel } from 'src/app/model/attachment/download-attachment-model';
import { UploadAttachmentResponse } from 'src/app/model/attachment/upload-attachment-response';
import { IBaseModel } from 'src/app/model/base/base-model';
import { ColumnType } from 'src/app/model/table/table';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { AddSingleFileResponse } from 'src/app/model/attachment/add-single-file-response';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService extends BaseDataService {
  private apiUrl = 'api/Attachment';
  private oDataUrl = 'odata/Attachment';

  constructor(
    http: WebHttpClient,
    odataQueryBuilderService: OdataQueryBuilderService
  ) {
    super(http, odataQueryBuilderService);
  }

  addData(request: AddAttachmentModel): Observable<Attachment> {
    const url = `${this.apiUrl}`;
    return super.add(url, request);
  }

  updateData(id: number, request: IBaseModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }
  deleteData(id: number, request: IDeleteModel): Observable<IBaseModel> {
    throw new Error('Method not implemented.');
  }

  isAlreadyExists(field: string, name: string): Observable<boolean> {
    const pageSortFilterInfo = new PageSortFilterInfo();
    pageSortFilterInfo.createFilter(name, field);
    pageSortFilterInfo.expandInfo = {
      select: ['id'],
    };

    return super.isExists(this.oDataUrl, pageSortFilterInfo);
  }

  getAllData(
    pageSortFilterData?: PageSortFilterInfo
  ): Observable<ApiResponse<Attachment>> {
    const url = `${this.oDataUrl}`;
    return super.get(url, undefined, pageSortFilterData).pipe(
      map((result) => {
        return new ApiResponse<Attachment>(result);
      })
    );
  }

  searchByName(input: string): Observable<any> {
    const pageSortFilterInfo = new PageSortFilterInfo();
    const options: IRequestOptions = {
      headers: this.headerWithoutLoading,
    };

    pageSortFilterInfo.createFilter(input, 'name', ColumnType.String, Constants.Empty, SearchOperator.Contains);

    return super.get(this.oDataUrl, options, pageSortFilterInfo).pipe(
      map((result) => {
        return new ApiResponse(result);
      })
    );
  }

  searchByField(field: string, value: string): Observable<ApiResponse<Attachment>> {
    const pageSortFilterInfo = new PageSortFilterInfo();
    const options: IRequestOptions = {
      headers: this.headerWithoutLoading,
    };

    pageSortFilterInfo.createFilter(value, field, ColumnType.String, Constants.Empty, SearchOperator.Contains);

    return super.get(this.oDataUrl, options, pageSortFilterInfo).pipe(
      map((result) => {
        return new ApiResponse(result);
      })
    );
  }

  getAllDataByAuditScheduleId(id: number): Observable<ApiResponse<Attachment>> {
    const pageSortFilterInfo = new PageSortFilterInfo();
    const options: IRequestOptions = {
      headers: this.headerWithoutLoading,
    };

    pageSortFilterInfo.createFilter(id, 'auditscheduleId', ColumnType.Number);

    return super.get(this.oDataUrl, options, pageSortFilterInfo).pipe(
      map((result) => {
        return new ApiResponse(result);
      })
    );
  }

  uploadFile(
    folderName: string,
    request: FormData,
    skipLoading = false
  ): Observable<UploadAttachmentResponse> {
    const url = `${this.apiUrl}/UploadFile/${folderName}`;

    if (skipLoading) {
      const _headers = new HttpHeaders().set('Accept', 'application/json');
      const _headerWithoutLoading = _headers.set(
        CustomHeader.SkipLoadingHeader,
        ''
      );
      const options: IRequestOptions = {
        headers: _headerWithoutLoading,
      };

      return super.add(url, request, options);
    } else {
      return super.add(url, request);
    }
  }

  downloadFile(
    attachment: DownloadAttachmentModel,
    skipLoading = false
  ): Observable<Blob> {
    const url = `${this.apiUrl}/DownloadFile`;

    const options: IRequestOptions = {
      responseType: 'blob',
    };

    if (skipLoading) {
      const _headers = new HttpHeaders().set(
        CustomHeader.SkipLoadingHeader,
        ''
      );
      options.headers = _headers;
    }

    return this.http.post<Blob>(url, attachment, options).pipe(
      map((result) => {
        return result;
      })
    );
  }


  GetPreSignedUrl(id: string, filePath: string, fileName: string, isUploadRequest: boolean, isPermanentFile: boolean): Observable<AddSingleFileResponse> {
    const url = `${this.apiUrl}/GetPreSignedUrl?attachmentId=${id}&filePath=${filePath}&fileName=${fileName}&isUploadRequest=${isUploadRequest}&isPermanentFile=${isPermanentFile}`;
    const options: IRequestOptions = {
      headers: this.headerWithoutLoading
    };

    return this.http.get<any>(`${url}`, options).pipe(
      map((result) => {
        return result;
      })
    );
  }


  downloadFiles(
    attachments: DownloadAttachmentModel[],
    skipLoading = false
  ): Observable<Blob> {
    const url = `${this.apiUrl}/DownloadAllFiles`;

    const options: IRequestOptions = {
      responseType: 'blob',
    };

    if (skipLoading) {
      const _headers = new HttpHeaders().set(
        CustomHeader.SkipLoadingHeader,
        ''
      );
      options.headers = _headers;
    }

    return this.http.post<Blob>(url, attachments, options).pipe(
      map((result) => {
        return result;
      })
    );
  }

  deleteTempFolder(folder: string): any {
    const url = `${this.apiUrl}/DeleteTempFolder`;
    const param = { folder: folder };

    const options: IRequestOptions = {
      headers: this.headerWithoutLoading,
    };

    return this.http.post<any>(url, param, options).subscribe((res) => {
      return res;
    });
  }

  getFileNameFromHttpResponse(httpResponse): string {
    try {
      const contentDispositionHeader = httpResponse.headers.get(
        'Content-Disposition'
      );
      const result = contentDispositionHeader
        .split(';')[1]
        .trim()
        .split('=')[1];
      return result.replace(/"/g, '');
    } catch (err) {
      return '';
    }
  }

  getFilesFromUpload(element: any) {
    const file = new File([''], element.attachment.name, {
      type: 'text/plain',
    });
    const f = new FileUpload(file, true);
    f.id = element.attachment.id.toString();
    f.name = element.attachment.name;
    f.filePath = element.attachment.savePath;
    f.status = true;
    f.canDelete = element.attachment.canDelete;
    return f;
  }
}
