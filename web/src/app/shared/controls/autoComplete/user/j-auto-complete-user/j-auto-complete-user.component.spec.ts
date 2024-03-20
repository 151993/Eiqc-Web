import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteUserComponent } from './j-auto-complete-user.component';

describe('JAutoCompleteUserComponent', () => {
  let component: JAutoCompleteUserComponent;
  let fixture: ComponentFixture<JAutoCompleteUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
