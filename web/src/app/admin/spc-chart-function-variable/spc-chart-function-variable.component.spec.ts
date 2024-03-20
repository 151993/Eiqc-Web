import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpcChartFunctionVariableComponent } from './spc-chart-function-variable.component';

describe('SpcChartFunctionVariableComponent', () => {
  let component: SpcChartFunctionVariableComponent;
  let fixture: ComponentFixture<SpcChartFunctionVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpcChartFunctionVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpcChartFunctionVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
