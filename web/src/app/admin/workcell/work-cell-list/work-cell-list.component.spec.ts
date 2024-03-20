import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCellListComponent } from './work-cell-list.component';

describe('WorkCellListComponent', () => {
  let component: WorkCellListComponent;
  let fixture: ComponentFixture<WorkCellListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCellListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
