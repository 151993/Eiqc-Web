import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierMeasurementViewComponent } from './supplier-measurement-view.component';

describe('SupplierMeasurementViewComponent', () => {
  let component: SupplierMeasurementViewComponent;
  let fixture: ComponentFixture<SupplierMeasurementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierMeasurementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierMeasurementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
