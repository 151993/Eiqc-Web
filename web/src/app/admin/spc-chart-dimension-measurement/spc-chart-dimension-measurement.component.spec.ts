import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpcChartDimensionMeasurementComponent } from './spc-chart-dimension-measurement.component';

describe('SpcChartDimensionMeasurementComponent', () => {
  let component: SpcChartDimensionMeasurementComponent;
  let fixture: ComponentFixture<SpcChartDimensionMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpcChartDimensionMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpcChartDimensionMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
