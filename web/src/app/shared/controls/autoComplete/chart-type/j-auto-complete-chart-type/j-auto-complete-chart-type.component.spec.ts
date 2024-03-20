import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JAutoCompleteChartTypeComponent } from './j-auto-complete-chart-type.component';


describe('JAutoCompleteChartTypeComponent', () => {
  let component: JAutoCompleteChartTypeComponent;
  let fixture: ComponentFixture<JAutoCompleteChartTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JAutoCompleteChartTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteChartTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
