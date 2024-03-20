import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DCCTasksComponent } from './dcc-tasks.component';

describe('DCCTasksComponent', () => {
  let component: DCCTasksComponent;
  let fixture: ComponentFixture<DCCTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DCCTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DCCTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
