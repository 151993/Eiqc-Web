import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoadingService } from '../shared/controls/loading/loading.service';
import { NotificationService } from '../shared/notification/notification.service';
import {
  LoadingMessage,
  LoadingIcon,
} from '../shared/controls/loading/loadingState';
import {
  ToastMessage,
  changeReasonModalConfig,
  PrimeNGDateSelectionMode,
} from '../shared/constant/global';
// import { TranslateService } from '@ngx-translate/core';
import { BaseModel } from '../model/base/base-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeReasonModalComponent } from '../shared/controls/modal/change-reason-modal/change-reason-modal.component';
import { ConfirmationModalComponent } from '../shared/controls/modal/confirmation-modal/confirmation-modal.component';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { FileUpload } from '../model/file-upload/file-upload';
import { Observable } from 'rxjs';
import { AttachmentService } from '../services/attachment/attachment.service';
import { AuthService } from '../auth/auth.service';
import { DateHelper } from '../shared/helpers/date-helper';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit, AfterViewInit {
  //#region User JAutoComplete
  public userFormInput: FormGroup;
  // propertiesUser = {
  //   name: 'name',
  //   user: 'user'
  // };
  // public userAutoCompleteConfig: JAutoCompleteConfig = {
  //   field: this.propertiesUser.name,
  //   minLength: '1',
  //   suggestions: this.user,
  //   format: '${value.name} (${value.userName})',
  //   dropdown: false,
  //   multiple: false,
  //   forceSelection: true,
  //   mappingField: this.propertiesUser.name
  // };

  //#endregion User JAutoComplete

  //#region Role AutoComplete
  public roleFI: FormGroup;
  //#endregion Role AutoComplete

  //#region Department AutoComplete
  public departmentFormInput: FormGroup;
  //#endregion

   //#region Department AutoComplete
   public workcellFormInput: FormGroup;
   //#endregion

  //#region Attachment
  files: FileUpload[] = [];
  tempFolder = '';
  //#endregion Attachment

  //#region DateTime
  public dateFormInput: FormGroup;
  minDate: Date = new Date();
  selectionModeSingle = PrimeNGDateSelectionMode.Single;
  selectionModeMultiple = PrimeNGDateSelectionMode.Multiple;
  selectionModeRange = PrimeNGDateSelectionMode.Range;
  maxDate: Date = new Date();
  //#endregion DateTime

  constructor(
    private loadingService: LoadingService,
    private notification: NotificationService,
    // private translateService: TranslateService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private attachmentService: AttachmentService
  ) { }

  ngOnInit() {
    this.userFormInput = this.formBuilder.group({
      userMultiple: new FormControl(null, Validators.required),
      userSingle: new FormControl(null, Validators.required),
    });

    this.roleFI = this.formBuilder.group({
      role: new FormControl(null, Validators.required),
    });

    this.departmentFormInput = this.formBuilder.group({
      department: new FormControl(null, Validators.required),
    });

    this.workcellFormInput = this.formBuilder.group({
      workcell: new FormControl(null, Validators.required),
    });

    this.tempFolder =
      this.authService.getUserId() + '_' + DateHelper.getDateTimeString();

    this.dateFormInput = this.formBuilder.group({
      selectedDateSingle: new FormControl(null, Validators.required),
      selectedDateRange: new FormControl(null, Validators.required),
      selectedDateMultiple: new FormControl(null, Validators.required),
    });
  }

  ngAfterViewInit() {
    const dtTemp = new Date();
    dtTemp.setMonth(dtTemp.getMonth() + 1);
    this.maxDate = dtTemp;
  }

  mockLoading() {
    this.loadingService.show(
      LoadingMessage.RetrievingData,
      LoadingIcon.Default
    );
    setTimeout(() => {
      this.loadingService.hide();
    }, 3000);
  }

  mockFullPageLoading() {
    this.loadingService.show(
      LoadingMessage.SavingChanges,
      LoadingIcon.Default,
      true
    );
    setTimeout(() => {
      this.loadingService.hide();
    }, 3000);
  }

  mockStaticLoading() {
    this.loadingService.show(
      LoadingMessage.LoggedOutLogIn,
      LoadingIcon.Blank,
      true,
      true
    );
  }

  showNotification() {
    this.notification.showSuccess(ToastMessage.Saved);
  }

  showErrorNotification() {
    this.notification.showError(ToastMessage.ServerError);
  }

  showInfoNotification() {
    this.notification.showInfo(ToastMessage.DataSaved);
  }

  showWarningNotification() {
    this.notification.showWarning(ToastMessage.Saved);
  }

  showAuditLog(record: BaseModel): void { }

  showChangeReasonModal() {
    this.openChangeReasonModal().result.then(
      (changeReason) => {
        this.notification.showInfo(
          ToastMessage.Blank,
          `You have entered : ${changeReason}`
        );
      },
      () => { }
    );
  }

  openChangeReasonModal() {
    return this.modalService.open(
      ChangeReasonModalComponent,
      changeReasonModalConfig
    );
  }

  showConfirmationModal() {
    this.openConfirmationModal().result.then(
      (response) => {
        this.notification.showInfo(
          ToastMessage.Blank,
          `You have selected : ${response}`
        );
      },
      () => { }
    );
  }

  openConfirmationModal() {
    return this.modalService.open(ConfirmationModalComponent);
  }

  showCustomConfirmationModal() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = 'Message.DemoOverrideConfirmMessage';
  }
  // #region : Attachment
  onFileUploaded(files: FileUpload[]) { }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    this.attachmentService.deleteTempFolder(this.tempFolder);
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return true;
  }
  // #endregion: Attachment

  //#region DateTime
  disableDate() {
    if (this.dateFormInput.disabled) {
      this.dateFormInput.enable();
    } else {
      this.dateFormInput.disable();
    }
  }
  //#endregion DateTime
}
