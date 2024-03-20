import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedInspectionPlanComponent } from './approved-inspection-plan.component';

describe('ApprovedInspectionPlanComponent', () => {
  let component: ApprovedInspectionPlanComponent;
  let fixture: ComponentFixture<ApprovedInspectionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedInspectionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedInspectionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
