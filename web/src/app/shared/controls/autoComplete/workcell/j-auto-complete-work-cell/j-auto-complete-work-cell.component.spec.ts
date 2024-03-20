import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteWorkCellComponent } from './j-auto-complete-work-cell.component';

describe('JAutoCompleteWorkCellComponent', () => {
  let component: JAutoCompleteWorkCellComponent;
  let fixture: ComponentFixture<JAutoCompleteWorkCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteWorkCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteWorkCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
