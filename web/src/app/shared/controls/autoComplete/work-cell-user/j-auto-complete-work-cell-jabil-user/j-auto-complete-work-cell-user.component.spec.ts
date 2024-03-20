import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteWorkCellUserComponent } from './j-auto-complete-work-cell-User.component';

describe('JAutoCompleteWorkCellComponent', () => {
  let component: JAutoCompleteWorkCellUserComponent;
  let fixture: ComponentFixture<JAutoCompleteWorkCellUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteWorkCellUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteWorkCellUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
