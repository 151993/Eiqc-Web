import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteAdminCertificationComponent } from './j-auto-complete-admin-certification.component';

describe('JAutoCompleteAdminCertificationComponent', () => {
  let component: JAutoCompleteAdminCertificationComponent;
  let fixture: ComponentFixture<JAutoCompleteAdminCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteAdminCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteAdminCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
