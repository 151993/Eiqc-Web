import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteParameterManagementComponent } from './j-auto-complete-parameter-management.component';

describe('JAutoComplete$EntityComponent', () => {
  let component: JAutoCompleteParameterManagementComponent;
  let fixture: ComponentFixture<JAutoCompleteParameterManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JAutoCompleteParameterManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteParameterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
