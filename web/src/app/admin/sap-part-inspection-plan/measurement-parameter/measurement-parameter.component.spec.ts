import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementParameterComponent } from './measurement-parameter.component';

describe('MeasurementParameterComponent', () => {
  let component: MeasurementParameterComponent;
  let fixture: ComponentFixture<MeasurementParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
