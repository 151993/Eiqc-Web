import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTasksComponent } from './supplier-tasks.component';

describe('SupplierTasksComponent', () => {
  let component: SupplierTasksComponent;
  let fixture: ComponentFixture<SupplierTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
