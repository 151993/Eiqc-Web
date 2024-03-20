import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteCountryComponent } from './j-auto-complete-country.component';

describe('JAutoCompleteCountryComponent', () => {
  let component: JAutoCompleteCountryComponent;
  let fixture: ComponentFixture<JAutoCompleteCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
