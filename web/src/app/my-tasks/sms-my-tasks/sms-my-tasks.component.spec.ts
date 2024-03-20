import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsMyTasksComponent } from './sms-my-tasks.component';

describe('SmsMyTasksComponent', () => {
  let component: SmsMyTasksComponent;
  let fixture: ComponentFixture<SmsMyTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsMyTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsMyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
