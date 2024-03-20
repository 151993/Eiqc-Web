import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteComponent } from './j-auto-complete.component';

describe('JAutoCompleteComponent', () => {
  let component: JAutoCompleteComponent;
  let fixture: ComponentFixture<JAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
