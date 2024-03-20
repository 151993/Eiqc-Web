import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteParameterTypeComponent } from './j-auto-complete-parameter-type.component';

describe('JAutoComplete$EntityComponent', () => {
  let component: JAutoCompleteParameterTypeComponent;
  let fixture: ComponentFixture<JAutoCompleteParameterTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JAutoCompleteParameterTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteParameterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
