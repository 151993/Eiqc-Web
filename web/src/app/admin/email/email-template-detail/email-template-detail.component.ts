import { BaseDetailComponent } from '../../../shared/base/base-detail/base-detail.component';
import { OnInit, OnDestroy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailTemplateService } from 'src/app/services/emailTemplate/email-template.service';
import { UpdateEmailTemplateModel } from 'src/app/model/emailTemplate/update-email-template-model';
import { EmailTemplate } from 'src/app/model/emailTemplate/email-template-model';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { ControlStates, ValidationErrorCodes, ToastMessage, UserEmailType } from 'src/app/shared/constant/global';
import { SharedEmailGuideEnum, UserEmailGuideEnum } from 'src/app/model/emailTemplateGuide/email-template-guide';
import { PermissionType } from 'src/app/shared/constant/roles';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-email-template-detail',
  templateUrl: './email-template-detail.component.html',
  styleUrls: ['./email-template-detail.component.css']
})
export class EmailTemplateDetailComponent extends BaseDetailComponent implements OnInit, OnDestroy {
  hideTemplateGuide = true;
  emailTemplate: EmailTemplate;
  emailTemplateGuideData = [];
  properties = {
    id: 'id',
    name: 'name',
    subject: 'subject',
    body: 'body'
  };
  constructor(
    private formBuilder: FormBuilder,
    private apiService: EmailTemplateService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.initForm();
    this.emailTemplate = new EmailTemplate();
    this.entity = this.emailTemplate;
    this.cancelRoute = '/Admin/EmailTemplate';

    this.canAccessPermissionType = PermissionType.AdminEmailTemplateCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminEmailTemplateCanUpdate;

    this.getUpdateModelFn = this.getUpdateModel;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      name: new FormControl({value: null, disabled: true}, Validators.required),
      subject: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData();
  }

  getData() {
    this.getEmailTemplateGuideData(this.recId);

    this.apiService.getDataById(this.recId).subscribe(data => {
      this.emailTemplate = new EmailTemplate(data);
      this.formDetails = this.entity;
      this.entity = this.emailTemplate;

      this.formInput.patchValue({
        id: this.emailTemplate.id,
        name: this.emailTemplate.name,
        subject: this.emailTemplate.subject,
        body: this.emailTemplate.body
      });

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getEmailTemplateGuideData(recId: number) {
    this.emailTemplateGuideData = [];
    let guideProperties = {};

    if (recId in UserEmailType) {
      guideProperties = Object.assign({}, UserEmailGuideEnum, SharedEmailGuideEnum);
    }

    Object.keys(guideProperties).forEach((key) => {
      this.emailTemplateGuideData.push({ key: `#{${key}}#`, description: guideProperties[key] });
    });

  }

  getUpdateModel(): UpdateEmailTemplateModel {
    const updateEmailTemplateModel = new UpdateEmailTemplateModel();

    Automapper.map(this.emailTemplate, updateEmailTemplateModel);

    return updateEmailTemplateModel;
  }

  isAsycValidationPending() {
    return this.formInput.controls[this.properties.name].status === ControlStates.PENDING;
  }

  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  //#region name validations

  isNameEmpty() {
    return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }

  isNameModified() {
    return this.isModified(this.properties.name);
  }
  // #end region

  //#region subject validations

  isSubjectEmpty() {
    return this.hasError(this.properties.subject, ValidationErrorCodes.required);
  }

  isSubjectModified() {
    return this.isModified(this.properties.subject);
  }

  // #end region

  //#region body validations


  isBodyEmpty() {
    return this.hasError(this.properties.subject, ValidationErrorCodes.required);
  }

  isBodyModified() {
    return this.isModified(this.properties.body);
  }
  // #end region

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty;
  }

  closeGuideEvent(event: any) {
    console.log(event);
  }

  onSaveClick() {
    const templateBody = this.formInput.controls[this.properties.body].value;
    const propertyStartIndices = this.getSubStringIndices('#{', templateBody);
    const propertyEndIndices = this.getSubStringIndices('}#', templateBody);

    if (propertyStartIndices.length !== propertyEndIndices.length) {
      this.notificationService.showError(ToastMessage.PropertyTagsNotMatchError);
      return;
    }

    for (let index = 0; index < propertyStartIndices.length; index++) {

      if (propertyStartIndices[index] < propertyEndIndices[index]) {
        this.notificationService.showError(ToastMessage.PropertyTagsNotMatchError);
        return;
      }

      const propertyName = `${templateBody.substring(propertyStartIndices[index], propertyEndIndices[index])}}#`;
      const propertyIndex = this.emailTemplateGuideData.findIndex(d => d.key === propertyName);

      if (propertyIndex < 0) {
        this.notificationService.showError(ToastMessage.PropertyNotMatchError);
        return;
      }
    }

    this.saveForm();
  }

  getSubStringIndices(searchStr, templateBody) {
    const searchStrLen = searchStr.length;
    if (searchStrLen === 0) {
      return [];
    }

    let startIndex = 0, index;
    const indices = [];

    while ((index = templateBody.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  }

}
