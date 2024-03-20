import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteUserListComponent } from './site-user-list.component';

describe('SiteUserListComponent', () => {
  let component: SiteUserListComponent;
  let fixture: ComponentFixture<SiteUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
