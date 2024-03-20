import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants } from 'src/app/shared/constant/global';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { Group } from 'src/app/model/group/group';
import { GroupService } from 'src/app/services/group/group.service';
import { UpdateGroupModel } from 'src/app/model/group/update-group-model';
import { AddGroupModel } from 'src/app/model/group/add-group-model';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {
  Group: Group;

  originalFormInput: string;
  autoCompleteGroupValue: string;

  properties = {
    id: 'id',
    wareHouse: 'wareHouse',
    userName: 'userName'
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: GroupService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    authService: AuthService
  ) {
    super(
      modalService,
      activatedRoute,
      router,
      notificationService,
      authService,
      apiService
    );
    this.initForm();
    this.Group = new Group();
    this.entity = this.Group;
    this.cancelRoute = '/Admin/Group';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminGroupCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminGroupCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminGroupCanCreate;
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      wareHouse: new FormControl(Constants.Empty, [
        Validators.required,
        Validators.maxLength(50),
        validateWhiteSpace]),
      userName: new FormControl(Constants.Empty, [
        Validators.maxLength(250)
      ]
      ),
      isEnabled: new FormControl(true, Validators.required)
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
        // this.formInput.controls[this.properties.name].setAsyncValidators(
        //   uniqueAsyncValidator(
        //     this.apiService,
        //     this.Group.name,
        //     this.properties.name
        //   )
        // );
      }, environment.timer.autoReturn);

      return;
    }

    this.apiService.getDataById(this.recId).subscribe((data) => {
      this.Group = new Group(data);

      this.formDetails = this.entity;

      this.entity = this.Group;

      this.formInput.patchValue({
        id: this.Group.id,
        wareHouse: this.Group.wareHouse,
        userName: this.Group.userName,
      });

      // this.formInput.controls[this.properties.name].setAsyncValidators(
      //   uniqueAsyncValidator(
      //     this.apiService,
      //     this.Group.name,
      //     this.properties.name
      //   )
      // );
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }

  getUpdateModel(): UpdateGroupModel {
    const updateGroupModel = new UpdateGroupModel();
    Automapper.map(this.Group, updateGroupModel);
    return updateGroupModel;
  }

  getAddModel(): AddGroupModel {
    const addGroupModel = new AddGroupModel();
    Automapper.map(this.Group, addGroupModel);
    return addGroupModel;
  }

  isModified(controlName: string) {
    return (
      this.formInput.controls[controlName].touched ||
      this.formInput.controls[controlName].dirty
    );
  }

  isAsycValidationPending() {
    // return (
    //   this.formInput.controls[this.properties.name].status ===
    //   ControlStates.PENDING
    // );
  }

  // #Group name validations

  // isNameEmpty() {
  //   return this.hasError(this.properties.name, ValidationErrorCodes.required);
  // }

  // isNameHasWhiteSpace() {
  //   return this.hasError(
  //     this.properties.name,
  //     ValidationErrorCodes.validateWhiteSpace
  //   );
  // }

  // isNameExists() {
  //   return this.hasError(
  //     this.properties.name,
  //     ValidationErrorCodes.alreadyExists
  //   );
  // }

  // isNameModified() {
  //   return this.isModified(this.properties.name);
  // }

  // #endGroup

  isSaveDisabled() {
    return (
      !this.enableSaveButton || !this.formInput.valid || !this.formInput.dirty
    );
  }
}
