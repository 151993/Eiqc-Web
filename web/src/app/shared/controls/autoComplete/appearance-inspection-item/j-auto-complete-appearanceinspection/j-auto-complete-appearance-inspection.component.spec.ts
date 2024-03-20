import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteAppearanceInspectionComponent } from './j-auto-complete-appearance-inspection.component';

describe('JAutoCompleteAppearanceinspectionComponent', () => {
  let component: JAutoCompleteAppearanceInspectionComponent;
  let fixture: ComponentFixture<JAutoCompleteAppearanceInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteAppearanceInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteAppearanceInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
