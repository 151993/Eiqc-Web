import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  forwardRef,
  AfterViewInit,
} from '@angular/core';
import * as _ from 'lodash';
import { FileUpload } from 'src/app/model/file-upload/file-upload';
import { NotificationService } from '../../notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { ToastMessage } from '../../constant/global';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { DownloadAttachmentModel } from 'src/app/model/attachment/download-attachment-model';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const CUSTOM_FILE_UPLOAD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => FileUploadComponent),
  multi: true,
};

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [CUSTOM_FILE_UPLOAD_CONTROL_VALUE_ACCESSOR],
})
export class FileUploadComponent
  implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() fileExtensions: string[];
  @Input() dragAndDrop = false;
  @Input() showSelectFile = false;
  @Input() showDeleteFile = true;
  @Input() multiple = false;
  @Input() showFiles = false;
  @Input() downloadFiles = false;
  @Input() uploadStatus = false;
  @Input() buttonText = 'Label.SelectFile';
  @Input() fileUploadId = '';
  @Input() maxFileSize = 999;
  @Input() maxFileUploadLimit = 0;
  @Input() isDisabled = false;
  @Output() fileImported = new EventEmitter<any>();
  @Output() filesModified = new EventEmitter<any>();

  _files: FileUpload[] = [];
  isWithinLimit: boolean;
  isWithinMaxFileUploadLimit: boolean;
  @Input()
  public set files(_value: FileUpload[]) {
    this._files = _value;
  }
  public get files(): FileUpload[] {
    return this._files;
  }
  @ViewChild('fileInput') fileInput;

  constructor(
    private notificationService: NotificationService,
    private translate: TranslateService,
    private _apiService: AttachmentService,
    private http: HttpClient,
  ) { }

  // tslint:disable-next-line:no-shadowed-variable
  propagateChange = (_: any) => { };
  onChanged = () => { };

  writeValue(obj: any[]): void {
    this._files = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onChanged = fn;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.fileExtensions !== undefined) {
      this.fileInput.nativeElement.accept =
        '.' + this.fileExtensions.toString().replace(/,/g, ',.');
    }
  }

  onFileChanged(files: FileList) {
    if (this._files != null) {
      if (this._files.length > 0 && !this.multiple) {
        this._files.splice(0);
      }
    }

    let hasInvalidFileTypes = false;
    const totalFiles =
      (this._files != null && this._files !== undefined ? this._files.length : 0) + (this.files != null && this.files !== undefined ? files.length : 0);
    if (this.maxFileUploadLimit !== 0 && totalFiles > this.maxFileUploadLimit) {
      this.isWithinMaxFileUploadLimit = false;
    } else {
      this.isWithinMaxFileUploadLimit = true;
    }
    Array.from(files).forEach((file) => {

      if (this.maxFileSize > 0 && file.size > 0) {
        if (!this.checkForValidFileSizeLimit(file)) {
          this.isWithinLimit = false;
        } else {
          this.isWithinLimit = true;
        }
      }

      const exist = _.find(this._files, (x) => {
        return x.file.name === file.name;
      });

      if (this.isWithinLimit !== undefined && !this.isWithinLimit) {
        setTimeout(() => {
          this.notificationService.showWarning(
            ToastMessage.Blank,
            `${file.name} - ${this.translate.instant(`File Size exceeds max limit of ${this.maxFileSize} MB`)}`
          );
        }, environment.timer.autoReturn);
      }

      if (this.isWithinMaxFileUploadLimit !== undefined && !this.isWithinMaxFileUploadLimit) {
        setTimeout(() => {
          this.notificationService.showWarning(
            ToastMessage.Blank,
            `${file.name} - ${this.translate.instant(`Only  ${this.maxFileUploadLimit} files upload is allowed `)}`
          );
        }, environment.timer.autoReturn);
      }

      if (!exist) {

        if (this.checkForValidExtension(file)) {
          if (this._files == null) {
            this._files = [];
          }

          if (this.checkForValidFileSizeLimit(file) && this.isWithinMaxFileUploadLimit) {
            this._files.push(new FileUpload(file, true, true));
          }

        } else {
          hasInvalidFileTypes = true;
          this._files.push(new FileUpload(file));
        }
      } else {
        setTimeout(() => {
          this.notificationService.showWarning(
            ToastMessage.Blank,
            `${file.name} - ${this.translate.instant(ToastMessage.FileExist)}`
          );
        }, environment.timer.autoReturn);
      }
    });

    if (hasInvalidFileTypes) {
      this.notificationService.showError(
        ToastMessage.Blank,
        `${this.translate.instant(
          ToastMessage.InvalidFileTypeError
        )} : ${this.translate.instant(
          ToastMessage.Requires
        )} '${this.fileExtensions.toString().replace(/,/g, ' / ')}'`
      );
    }

    if (this.fileImported.observers.length > 0) {
      this.fileImported.emit(this._files.filter((x) => x.isValid === true));
    } else {
      this.uploadFile(this._files.filter((x) => x.isValid === true));
    }

    this.propagateChange(this._files);
    this.onChanged();
  }

  onFileDropped(event: any) {
    this.onFileChanged(event);
  }

  checkForValidExtension(file: File) {
    const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
    if (this.fileExtensions.includes(fileExtension.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  checkForValidFileSizeLimit(file: File) {
    if (file.size / (1024 * 1024) > this.maxFileSize) {
      return false;
    } else {
      return true;
    }
  }

  uploadFile(files: FileUpload[]) {
    if (this.fileUploadId !== '') {
      files.forEach((file) => {
        if (!file.status && file.isValid) {
          const blob = new Blob([file.file], { type: 'blob' });
          const formData = new FormData();
          formData.append('file', file.file);
          file.progress = 1;
          this._apiService
            .GetPreSignedUrl(this.fileUploadId, '', file.file.name, true, false)
            .subscribe(
              (res) => {
                const headers = { 'Content-Type': file.file.type };
                const upload = this.http.put(res.preSignedUrl, blob, { headers }).toPromise();
                upload.then(data => {
                  this._apiService
                    .GetPreSignedUrl(this.fileUploadId, '', file.file.name, false, false)
                    .subscribe(
                      (resDownload) => {
                        file.status = true;
                        file.progress = 0;
                        file.filePath = resDownload.key;
                        file.name = file.file.name;
                        file.isWithinSizeLimit = true;
                      }
                    );
                }).catch(err => console.log('error: ', err));

              },

            );

        }
      });
    } else {
      this._files = [];
      this.notificationService.showError(ToastMessage.RequireFileUploadId);
    }
  }

  removeFile(fileIndex: number) {
    this._files.splice(fileIndex, 1);

    if (this.filesModified.observers.length > 0) {
      this.filesModified.emit(this._files.filter((x) => x.isValid === true));
    }
    this.propagateChange(this._files);
    this.onChanged();
  }

  downloadFileFromLambda(id: string, filePath: string, fileName: string) {
    const attachment = {
      Id: id,
      SavePath: filePath,
      Name: fileName,
    } as DownloadAttachmentModel;
    this._apiService.downloadFile(attachment, true).subscribe(
      (res) => {
        const blob = new Blob([res], { type: 'application/octet-stream' });
        const fileNameFromResponse = this._apiService.getFileNameFromHttpResponse(
          res
        );
        saveAs(
          blob,
          fileNameFromResponse !== '' ? fileNameFromResponse : fileName
        );
      },
      (err) => { }
    );
  }


  downloadFile(id: string, filePath: string, fileName: string) {
    const isPermanentfile = Number(id) > 0 ? true : false;
    this._apiService
      .GetPreSignedUrl(this.fileUploadId, filePath, fileName, false, isPermanentfile)
      .subscribe(
        (res) => {
          this.downloadFileBlob(res.preSignedUrl).subscribe(
            (downloadResponse) => {
              const blob = new Blob([downloadResponse], { type: 'blob' });
              const fileNameFromResponse = this._apiService.getFileNameFromHttpResponse(res);
              saveAs(blob, fileNameFromResponse !== '' ? fileNameFromResponse : fileName);
            }
          );
        },

      );
  }

  downloadFileBlob(
    presignedUrl: string
  ): Observable<Blob> {

    return this.http.get(presignedUrl, {
      responseType: 'blob'
    });
  }


  downloadAllFiles() {
    if (this.files.length > 0) {
      const attachments: DownloadAttachmentModel[] = [];
      this.files.forEach((file) => {
        if (file.name !== '' && file.filePath !== '') {
          attachments.push({
            Id: file.id,
            SavePath: file.filePath,
            Name: file.name,
          } as DownloadAttachmentModel);
        }
      });
      if (attachments.length > 0) {
        if (attachments.length === 1) {
          this.downloadFile(
            attachments[0].Id,
            attachments[0].SavePath,
            attachments[0].Name
          );
        } else {
          this._apiService.downloadFiles(attachments).subscribe(
            (res) => {
              const blob = new Blob([res], {
                type: 'application/octet-stream',
              });
              const fileNameFromResponse = this._apiService.getFileNameFromHttpResponse(
                res
              );
              saveAs(
                blob,
                fileNameFromResponse !== ''
                  ? fileNameFromResponse
                  : 'Downloads.zip'
              );
            },
            (err) => { }
          );
        }
      }
    }
  }
}
