import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCellDetailComponent } from './work-cell-detail.component';

describe('WorkCellDetailComponent', () => {
  let component: WorkCellDetailComponent;
  let fixture: ComponentFixture<WorkCellDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCellDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
