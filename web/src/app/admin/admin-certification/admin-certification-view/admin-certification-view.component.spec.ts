import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCertificationViewComponent } from './admin-certification-view.component';

describe('AdminCertificationViewComponent', () => {
  let component: AdminCertificationViewComponent;
  let fixture: ComponentFixture<AdminCertificationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCertificationViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCertificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
