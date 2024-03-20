import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteParameterManagementTypeComponent } from './j-auto-complete-parameter-management-type.component';

describe('JAutoCompleteParameterManagementTypeComponent', () => {
  let component: JAutoCompleteParameterManagementTypeComponent;
  let fixture: ComponentFixture<JAutoCompleteParameterManagementTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JAutoCompleteParameterManagementTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteParameterManagementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
