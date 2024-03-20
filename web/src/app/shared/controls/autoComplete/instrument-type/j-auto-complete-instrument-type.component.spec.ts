import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteInstrumentTypeComponent } from './j-auto-complete-instrument-type.component';

describe('JAutoComplete$EntityComponent', () => {
  let component: JAutoCompleteInstrumentTypeComponent;
  let fixture: ComponentFixture<JAutoCompleteInstrumentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteInstrumentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteInstrumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
