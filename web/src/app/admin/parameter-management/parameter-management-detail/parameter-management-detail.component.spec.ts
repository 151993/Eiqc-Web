
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterManagementDetailComponent } from './parameter-management-detail.component';

describe('ParameterManagementDetailComponent', () => {
  let component: ParameterManagementDetailComponent;
  let fixture: ComponentFixture<ParameterManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterManagementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
