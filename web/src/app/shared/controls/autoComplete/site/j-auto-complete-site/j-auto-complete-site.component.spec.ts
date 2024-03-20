import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteSiteComponent } from './j-auto-complete-site.component';

describe('JAutoCompleteSiteComponent', () => {
  let component: JAutoCompleteSiteComponent;
  let fixture: ComponentFixture<JAutoCompleteSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
