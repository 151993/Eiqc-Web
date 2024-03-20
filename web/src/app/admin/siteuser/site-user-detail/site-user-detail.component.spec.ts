import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteUserDetailComponent } from './site-user-detail.component';

describe('SiteUserDetailComponent', () => {
  let component: SiteUserDetailComponent;
  let fixture: ComponentFixture<SiteUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
