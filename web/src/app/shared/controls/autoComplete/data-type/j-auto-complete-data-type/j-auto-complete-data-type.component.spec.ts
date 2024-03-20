import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteDataTypeComponent } from './j-auto-complete-data-type.component';

describe('JAutoCompleteDataTypeComponent', () => {
  let component: JAutoCompleteDataTypeComponent;
  let fixture: ComponentFixture<JAutoCompleteDataTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JAutoCompleteDataTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteDataTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
