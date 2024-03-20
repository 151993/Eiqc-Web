import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterManagementListComponent } from './parameter-management-list.component';

describe('ParameterManagementListComponent', () => {
  let component: ParameterManagementListComponent;
  let fixture: ComponentFixture<ParameterManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
