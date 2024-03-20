import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteWorkCellSiteComponent } from './j-auto-complete-work-cell-site.component';

describe('JAutoCompleteWorkCellSiteComponent', () => {
  let component: JAutoCompleteWorkCellSiteComponent;
  let fixture: ComponentFixture<JAutoCompleteWorkCellSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteWorkCellSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteWorkCellSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
