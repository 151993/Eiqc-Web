/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefectManagementService } from 'src/app/services/defect-management/defect-management.service';
import { environment } from 'src/environments/environment';
import { UpdateDefectManagementModel } from 'src/app/model/defect-management/update-defect-management-model';
import { AddDefectManagementModel } from 'src/app/model/defect-management/add-defect-management-model';
import { DefectManagement } from 'src/app/model/defect-management/defect-management';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, ValidationErrorCodes, ToastMessage } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { DefectType } from 'src/app/model/defect-type/defect-type';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';

@Component({
  selector: 'app-defect-management-detail',
  templateUrl: './defect-management-detail.component.html',
  styleUrls: ['./defect-management-detail.component.css']
})
export class DefectManagementDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  properties = {
    id: 'id',
    defectSection: 'defectSection',
    defectTypeName: 'defectTypeName'
  };

  defectTypeNameColumns = [
    { field: 'defectTypeName', header: 'DefectTypeName', isVisible: true }
  ];

  public defectSectionAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'description',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'description',
    format: '${value.description}',
  };

  certificateType: DefectManagement;
  originalDefectTypes: DefectType[] = [];
  addedDefectTypes: string[] = [];
  removedDefectTypes: string[] = [];
  originalDefectTypeNames: string[];
  defectManagement: DefectManagement;
  defectSectionId: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: DefectManagementService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new DefectManagement();
    this.initForm();
    this.cancelRoute = '/Admin/DefectManagement';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminDefectManagementCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminDefectManagementCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminDefectManagementCanCreate;

  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      defectSection: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50)
      ]),

      defectTypeName: new FormControl(Constants.Empty),
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
      }, environment.timer.autoReturn);
      return;
    }

    this.apiService.getDataById(this.recId).subscribe(data => {

      this.defectManagement = new DefectManagement(data);

      this.formDetails = this.entity;
      this.entity = this.defectManagement;
      this.formInput.patchValue({
        id: this.defectManagement.id,
        defectSection: this.defectManagement.defectSection,
        defectSectionId: this.defectManagement.defectSectionId,
        isEnabled: this.defectManagement.isEnabled,
      });

      this.defectSectionId = this.defectManagement.defectSectionId;

      this.defectManagement.defectTypes.forEach(element => {
        this.originalDefectTypes.push(element);
      });

      this.originalDefectTypeNames = JSON.parse(
        JSON.stringify(_.map(this.defectManagement.defectTypes, (x) => x.defectTypeName))
      );

      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateDefectManagementModel {

    const updateDefectManagementModel = new UpdateDefectManagementModel();

    Automapper.map(this.entity, updateDefectManagementModel);

    const defectTypes = this.originalDefectTypes.map(a => a.defectTypeName);

    updateDefectManagementModel.defectSectionId = this.defectSectionId;

    updateDefectManagementModel.addedDefectTypes = this.getAddedDefectTypes(defectTypes);

    updateDefectManagementModel.removedDefectTypes = this.getRemovedDefectTypes(defectTypes);

    return updateDefectManagementModel;
  }

  getRemovedDefectTypes(defectTypes: string[]) {
    const added = _.difference(this.originalDefectTypeNames, defectTypes);
    return added;
  }

  getAddedDefectTypes(defectTypes: string[]) {
    const added = _.difference(defectTypes, this.originalDefectTypeNames);
    return added;
  }

  onDefectSectionSelect(event) {
    this.defectSectionId = event.id;
  }


  getAddModel(): AddDefectManagementModel {

    const addDefectManagementModel = new AddDefectManagementModel();

    Automapper.map(this.entity, addDefectManagementModel);

    addDefectManagementModel.defectSectionId = this.defectSectionId;

    const defectTypes = this.originalDefectTypes.map(a => a.defectTypeName);

    addDefectManagementModel.addedDefectTypes = this.getAddedDefectTypes(defectTypes);

    return addDefectManagementModel;
  }


  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isDefectSectionModified() {
    return this.isModified(this.properties.defectSection);
  }

  isDefectSectionEmpty() {
    return this.hasError(this.properties.defectSection, ValidationErrorCodes.required);
  }

  isDefectSectionExists() {
    return this.hasError(this.properties.defectSection, ValidationErrorCodes.alreadyExists);
  }

  addDefectTypes(defectTypeName: string) {
    const defectType = new DefectType();
    defectType.defectTypeName = defectTypeName;
    defectType.enableRowDelete = true;
    defectType.isEnabled = true;
    if (defectTypeName.trim() !== Constants.Empty) {
      if (this.checkExistenceRecord(this.originalDefectTypes, defectTypeName)) {
        this.notificationService.showError(ToastMessage.DataExist);
      } else {
        this.originalDefectTypes.push(defectType);
        this.formInput.patchValue({ defectTypeName: Constants.Empty });
        this.formInput.controls[this.properties.defectSection].markAsDirty();
      }
    } else {
      this.notificationService.showError(ToastMessage.DefectTypeCannotBeEmpty);
    }
  }

  deleteDefectType(record: any): void {
    const index = this.originalDefectTypes.indexOf(record);
    this.originalDefectTypes.splice(index, 1);
    this.formInput.controls[this.properties.defectSection].markAsDirty();
  }

  checkExistenceRecord(objectModelData: any, name: string): boolean {
    return objectModelData.some(r => r.defectTypeName === name);
  }

  isSaveDisabled() {
    return !this.formInput.valid
      || !this.formInput.dirty || !(this.originalDefectTypes.length > 0);
  }

}
