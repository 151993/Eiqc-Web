import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpcChartMicroSectionComponent } from './spc-chart-micro-section.component';

describe('SpcChartMicroSectionComponent', () => {
  let component: SpcChartMicroSectionComponent;
  let fixture: ComponentFixture<SpcChartMicroSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpcChartMicroSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpcChartMicroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
