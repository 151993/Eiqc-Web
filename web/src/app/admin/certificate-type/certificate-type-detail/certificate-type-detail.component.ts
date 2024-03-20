/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CertificateTypeService } from 'src/app/services/certificate-type/certificate-type.service';
import { environment } from 'src/environments/environment';
import { UpdateCertificateTypeModel } from 'src/app/model/certificate-type/update-certificate-type-model';
import { AddCertificateTypeModel } from 'src/app/model/certificate-type/add-certificate-type-model';
import { CertificateType } from 'src/app/model/certificate-type/certificate-type';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { ControlStates, Constants, ValidationErrorCodes, ToastMessage, defaultParameterColumn } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { uniqueAsyncValidator } from 'src/app/shared/validators/asyncValidators';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { CertificateTypeParameter } from 'src/app/model/certificate-type-parameter/certificate-type-parameter';

@Component({
  selector: 'app-certificate-type-detail',
  templateUrl: './certificate-type-detail.component.html',
  styleUrls: ['./certificate-type-detail.component.css']
})
export class CertificateTypeDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    name: 'name',
    parameterName: 'parameterName'
  };

  parameterNameColumns = [
    { field: 'parameterName', header: 'ParameterName', isVisible: true }
  ];

  certificateType: CertificateType;
  certificateTypeParameter = new CertificateTypeParameter();
  originalCertificateTypeParameters: CertificateTypeParameter[] = [];
  addedCertificateTypeParameters: string[] = [];
  removedCertificateTypeParameters: string[] = [];
  originalParameters: string[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: CertificateTypeService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new CertificateType();
    this.initForm();
    this.cancelRoute = '/Admin/CertificateType';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminCertificateTypeCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminCertificateTypeCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminCertificateTypeCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      name: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50)
      ]),

      parameterName: new FormControl(Constants.Empty),
      isEnabled: new FormControl(true, Validators.required),
      changeReason: new FormControl(Constants.Empty)
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData();
  }

  getData() {
    // If create mode then return
    if (this.recId === null) {
      // In order to work properly need to add a delay
      setTimeout(() => {
        this.formInput.controls[this.properties.name].setAsyncValidators(uniqueAsyncValidator(this.apiService, Constants.Empty, this.properties.name));
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {
      this.certificateType = new CertificateType(data);

      this.formDetails = this.entity;
      this.entity = this.certificateType;
      this.formInput.patchValue({
        id: this.certificateType.id,
        name: this.certificateType.name,
        isEnabled: this.certificateType.isEnabled,
      });
      this.formInput.controls[this.properties.name].setAsyncValidators(uniqueAsyncValidator(this.apiService, this.certificateType.name, this.properties.name));

      this.certificateType.certificateTypeParameters.forEach(element => {
        this.originalCertificateTypeParameters.push(element);
      });

      this.appendDefaultHiddenValues();

      this.originalParameters = JSON.parse(
        JSON.stringify(_.map(this.certificateType.certificateTypeParameters, (x) => x.parameterName))
      );

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateCertificateTypeModel {

    const updateCertificateTypeModel = new UpdateCertificateTypeModel();

    Automapper.map(this.entity, updateCertificateTypeModel);

    const parameterNames = this.originalCertificateTypeParameters.map(a => a.parameterName);
    parameterNames.push(defaultParameterColumn[0].parameterName, defaultParameterColumn[1].parameterName, defaultParameterColumn[2].parameterName);
    updateCertificateTypeModel.addedCertificateTypeParameters = this.getAddedCertificateTypeParameters(parameterNames);
    updateCertificateTypeModel.removedCertificateTypeParameters = this.getRemovedCertificateTypeParameters(parameterNames);

    return updateCertificateTypeModel;
  }

  getRemovedCertificateTypeParameters(parameters: string[]) {
    const added = _.difference(this.originalParameters, parameters);
    return added;
  }

  getAddedCertificateTypeParameters(parameters: string[]) {
    const added = _.difference(parameters, this.originalParameters);
    return added;
  }

  getAddModel(): AddCertificateTypeModel {


    const addCertificateTypeModel = new AddCertificateTypeModel();

    Automapper.map(this.entity, addCertificateTypeModel);

    const parameters = this.originalCertificateTypeParameters.map(a => a.parameterName);

    addCertificateTypeModel.addedCertificateTypeParameters = this.getAddedCertificateTypeParameters(parameters);

    addCertificateTypeModel.addedCertificateTypeParameters = this.appendDefaultHiddenValues();

    return addCertificateTypeModel;
  }

  appendDefaultHiddenValues() {
    const certificateTypeParameterObject: CertificateTypeParameter[] = [];
    if (this.recId === null) {
      defaultParameterColumn.forEach(element => {
        this.certificateTypeParameter = new CertificateTypeParameter();
        this.certificateTypeParameter = this.getDataReturnObj(element);
        this.originalCertificateTypeParameters.push(this.certificateTypeParameter);
      });
    } else {
      const hiddenPartParameter = _.difference(this.originalCertificateTypeParameters.map(x => x.parameterName),
       [defaultParameterColumn[0].parameterName, defaultParameterColumn[1].parameterName, defaultParameterColumn[2].parameterName]);
      hiddenPartParameter.map(a => {
        this.originalCertificateTypeParameters.filter(x => x.parameterName === a).map(y => {
          this.certificateTypeParameter = new CertificateTypeParameter();
          this.certificateTypeParameter = this.getDataReturnObj(y);
          certificateTypeParameterObject.push(this.certificateTypeParameter);
        });
      });
    }
    this.originalCertificateTypeParameters = this.recId !== null ? certificateTypeParameterObject : this.originalCertificateTypeParameters;
    return this.originalCertificateTypeParameters.map(a => a.parameterName);
  }

  getDataReturnObj(record): any {
    return {
      id: this.recId !== null ? record.id : 0,
      parameterName: record.parameterName,
      enableRowDelete: true,
      isEnabled: true
    };
  }



  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isNameModified() {
    return this.isModified(this.properties.name);
  }

  isNameEmpty() {
    return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }

  isNameExists() {
    return this.hasError(this.properties.name, ValidationErrorCodes.alreadyExists);
  }

  isAsyncValidationPending() {
    return this.formInput.controls[this.properties.name].status === ControlStates.PENDING;
    // TO DO: Remove extra or(||)
  }

  addParameter(parameterName: string) {
    const certificateTypeParameter = new CertificateTypeParameter();
    certificateTypeParameter.parameterName = parameterName;
    certificateTypeParameter.enableRowDelete = true;
    certificateTypeParameter.isEnabled = true;

    if (this.checkExistenceRecord(this.originalCertificateTypeParameters, parameterName)) {
      this.notificationService.showError(ToastMessage.DataExist);
    } else {
      this.originalCertificateTypeParameters.push(certificateTypeParameter);
      this.formInput.patchValue({ parameterName: Constants.Empty });
      this.formInput.controls[this.properties.name].markAsDirty();
    }
  }

  deleteParameter(record: any): void {
    const index = this.originalCertificateTypeParameters.indexOf(record);
    this.originalCertificateTypeParameters.splice(index, 1);
    this.formInput.controls[this.properties.name].markAsDirty();
  }

  checkExistenceRecord(objectModelData: any, name: string): boolean {
    return objectModelData.some(r => r.parameterName === name);
  }


  isSaveDisabled() {
    return !this.formInput.valid
      || !this.formInput.dirty || !(this.originalCertificateTypeParameters.length > 0);
  }

}
