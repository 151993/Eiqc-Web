import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierMeasurementMenuConfigurationComponent } from './supplier-measurement-menu-configuration.component';

describe('SupplierMeasurementMenuConfigurationComponent', () => {
  let component: SupplierMeasurementMenuConfigurationComponent;
  let fixture: ComponentFixture<SupplierMeasurementMenuConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierMeasurementMenuConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierMeasurementMenuConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
