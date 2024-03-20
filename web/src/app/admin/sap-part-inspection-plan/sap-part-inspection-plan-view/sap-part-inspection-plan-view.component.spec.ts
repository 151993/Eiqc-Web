import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SapPartInspectionPlanViewComponent } from './sap-part-inspection-plan-view.component';

describe('SapPartInspectionPlanViewComponent', () => {
  let component: SapPartInspectionPlanViewComponent;
  let fixture: ComponentFixture<SapPartInspectionPlanViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SapPartInspectionPlanViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SapPartInspectionPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
