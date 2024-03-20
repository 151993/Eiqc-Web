import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostListLoadingComponent } from './ghost-list-loading.component';

describe('GhostListLoadingComponent', () => {
  let component: GhostListLoadingComponent;
  let fixture: ComponentFixture<GhostListLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhostListLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostListLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
