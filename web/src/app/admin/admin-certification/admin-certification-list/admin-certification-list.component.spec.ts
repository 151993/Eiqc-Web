import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCertificationListComponent } from './admin-certification-list.component';

describe('AdminCertificationListComponent', () => {
  let component: AdminCertificationListComponent;
  let fixture: ComponentFixture<AdminCertificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCertificationListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCertificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
