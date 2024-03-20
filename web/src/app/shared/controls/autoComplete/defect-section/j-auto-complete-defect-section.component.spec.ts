
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JAutoCompleteDefectSectionComponent } from './j-auto-complete-defect-section.component';


describe('JAutoCompleteDefectSectionComponent', () => {
  let component: JAutoCompleteDefectSectionComponent;
  let fixture: ComponentFixture<JAutoCompleteDefectSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteDefectSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteDefectSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
