
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';
import { BowTwistFormulaService } from 'src/app/services/bow-twist-formula/bow-twist-formula.service';
import { environment } from 'src/environments/environment';
import { UpdateBowTwistFormulaModel } from 'src/app/model/bow-twist-formula/update-bow-twist-formula-model';
import { AddBowTwistFormulaModel } from 'src/app/model/bow-twist-formula/add-bow-twist-formula-model';
import { BowTwistFormula } from 'src/app/model/bow-twist-formula/bow-twist-formula';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants, SpecType, ValidationErrorCodes } from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
import { WarPage } from 'src/app/model/war-page/war-page';

const regexExpression = '(Spec|Length|Width|SQRT|spec|length|width)+';
@Component({
  selector: 'app-bow-twist-formula-detail',
  templateUrl: './bow-twist-formula-detail.component.html',
  styleUrls: ['./bow-twist-formula-detail.component.css'],
  providers: [NgbTooltipConfig]
})
export class BowTwistFormulaDetailComponent extends BaseDetailComponent
  implements OnInit, OnDestroy {


  public warPageAutoCompleteConfig: JAutoCompleteConfig = {
    field: 'description',
    minLength: '1',
    suggestions: [],
    multiple: false,
    forceSelection: true,
    dropdown: true,
    mappingField: 'description',
    format: '${value.description}',
  };

  properties = {
    id: 'id',
    name: 'name',
    equation: 'equation',
    warPage: 'warPage'
  };
  count: number;
  isValidFormula: boolean;
  bowTwistFormulaExpression: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: BowTwistFormulaService,
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    notificationService: NotificationService,
    modalService: NgbModal,
    router: Router,
    toolTipconfig: NgbTooltipConfig
  ) {
    super(modalService, activatedRoute, router, notificationService, authService, apiService);
    this.entity = new BowTwistFormula();
    this.initForm();
    this.cancelRoute = '/Admin/BowTwistFormula';

    this.getUpdateModelFn = this.getUpdateModel;
    this.getAddModelFn = this.getAddModel;

    this.canAccessPermissionType = PermissionType.AdminBowTwistFormulaCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminBowTwistFormulaCanUpdate;
    this.canCreatPermissionType = PermissionType.AdminBowTwistFormulaCanCreate;

    toolTipconfig.placement = 'right';
    toolTipconfig.triggers = 'click';
  }

  initForm() {
    this.formInput = this.formBuilder.group({
      id: 0,
      name: new FormControl(Constants.Empty, [
        Validators.maxLength(50),
        validateWhiteSpace
      ]),
      equation: new FormControl(Constants.Empty, [
        Validators.maxLength(255),
        validateWhiteSpace
      ]),
      warPage: new FormControl(Constants.Empty, [
        Validators.required
      ]),
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

    this.apiService.getBowTwistDataById(this.recId).subscribe(data => {
      const bowTwistFormula = new BowTwistFormula(data);

      this.formDetails = this.entity;
      this.entity = bowTwistFormula;
      this.formInput.patchValue({
        id: bowTwistFormula.id,
        name: bowTwistFormula.name,
        equation: bowTwistFormula.equation,
        warPage: bowTwistFormula.warPage,
        isEnabled: bowTwistFormula.isEnabled,
      });
      this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
    });
  }



  getUpdateModel(): UpdateBowTwistFormulaModel {

    const warPage = this.formInput.controls[this.properties.warPage].value as WarPage;

    const updateBowTwistFormulaModel = new UpdateBowTwistFormulaModel();

    Automapper.map(this.entity, updateBowTwistFormulaModel);

    updateBowTwistFormulaModel.warPageId = warPage.id;

    return updateBowTwistFormulaModel;
  }

  getAddModel(): AddBowTwistFormulaModel {

    const warPage = this.formInput.controls[this.properties.warPage].value as WarPage;

    const addBowTwistFormulaModel = new AddBowTwistFormulaModel();

    Automapper.map(this.entity, addBowTwistFormulaModel);

    addBowTwistFormulaModel.warPageId = warPage.id;

    return addBowTwistFormulaModel;
  }


  BalancedBracketsValidator(expression: any) {
    this.count = 0;
    const openingBracketCount = (expression.match(/[(]/g) || []).length;
    const closingBracketCount = (expression.match(/[)]/g) || []).length;
    if (openingBracketCount !== closingBracketCount) {
      return false;
    } else {
      return true;
    }
  }

  evaluateValidator(value: string) {
    try {
      this.bowTwistFormulaExpression = this.apiService.replaceExpression(SpecType.Default, SpecType.Default, SpecType.Default, value);
      // tslint:disable-next-line:no-eval
      eval(this.bowTwistFormulaExpression);
      this.isValidFormula = true;
    } catch (e) {
      if (e instanceof SyntaxError) {
        this.isValidFormula = false;
      }
    }
    return this.isValidFormula;
  }


  isNameModified() {
    return this.isModified(this.properties.name);
  }

  isNameHasWhiteSpace() {
    return this.hasError(this.properties.name, ValidationErrorCodes.validateWhiteSpace);
  }

  isNameEmpty() {
    return this.hasError(this.properties.name, ValidationErrorCodes.required);
  }

  isNameExists() {
    return this.hasError(this.properties.name, ValidationErrorCodes.alreadyExists);
  }

  isEquationModified() {
    return this.isModified(this.properties.equation);
  }

  isEquationHasWhiteSpace() {
    return this.hasError(this.properties.equation, ValidationErrorCodes.validateWhiteSpace);
  }

  isEquationEmpty() {
    return this.hasError(this.properties.equation, ValidationErrorCodes.required);
  }

  isWarPageModified() {
    return this.isModified(this.properties.warPage);
  }

  isWarPageEmpty() {
    return this.hasError(this.properties.warPage, ValidationErrorCodes.required);
  }

  isEquationMatch() {
    const regex = new RegExp(regexExpression);
    const isBalancedBrackets = this.BalancedBracketsValidator(this.formInput.controls[this.properties.equation].value);
    this.evaluateValidator(this.formInput.controls[this.properties.equation].value);
    const isOperatorExists = this.apiService.validateOperatorsExistance(this.formInput.controls[this.properties.equation].value);
    if (regex.test(this.formInput.controls[this.properties.equation].value) && isBalancedBrackets && this.isValidFormula && isOperatorExists) {
      this.isValidFormula = true;
    } else {
      this.isValidFormula = false;
    }
    return this.isValidFormula;
  }

  isModified(controlName: string) {
    return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
  }

  isAsyncValidationPending() {
    return;
  }

  isSaveDisabled() {
    return !this.enableSaveButton
      || !this.formInput.valid
      || !this.formInput.dirty
      || this.isValidFormula !== undefined && !this.isValidFormula;
  }

}
