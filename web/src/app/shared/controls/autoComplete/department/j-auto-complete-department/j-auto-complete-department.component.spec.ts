import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteDepartmentComponent } from './j-auto-complete-department.component';

describe('JAutoCompleteDepartmentComponent', () => {
  let component: JAutoCompleteDepartmentComponent;
  let fixture: ComponentFixture<JAutoCompleteDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
