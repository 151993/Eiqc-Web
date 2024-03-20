import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedSupplierMeasurementSubmissionComponent } from './approved-supplier-measurement-form.component';

describe('ApprovedSupplierMeasurementSubmissionComponent', () => {
  let component: ApprovedSupplierMeasurementSubmissionComponent;
  let fixture: ComponentFixture<ApprovedSupplierMeasurementSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedSupplierMeasurementSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedSupplierMeasurementSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
