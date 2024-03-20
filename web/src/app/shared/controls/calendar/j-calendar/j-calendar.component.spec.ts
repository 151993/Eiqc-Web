import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JCalendarComponent } from './j-calendar.component';

describe('JCalendarComponent', () => {
  let component: JCalendarComponent;
  let fixture: ComponentFixture<JCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
