import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MicroSectionParameterComponent } from './micro-section-parameter.component';

describe('MeasurementParameterComponent', () => {
  let component: MicroSectionParameterComponent;
  let fixture: ComponentFixture<MicroSectionParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroSectionParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroSectionParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
