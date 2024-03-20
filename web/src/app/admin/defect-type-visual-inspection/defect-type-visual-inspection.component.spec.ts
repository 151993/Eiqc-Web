import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DefectTypeVisualInspectionComponent } from './defect-type-visual-inspection.component';

describe('DefectTypeVisualInspectionComponent', () => {
  let component: DefectTypeVisualInspectionComponent;
  let fixture: ComponentFixture<DefectTypeVisualInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectTypeVisualInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectTypeVisualInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
