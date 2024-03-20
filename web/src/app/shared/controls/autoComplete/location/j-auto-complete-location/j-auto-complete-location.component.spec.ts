import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteLocationComponent } from './j-auto-complete-location.component';

describe('JAutoCompleteLocationComponent', () => {
  let component: JAutoCompleteLocationComponent;
  let fixture: ComponentFixture<JAutoCompleteLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
