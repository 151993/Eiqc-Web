import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTasksMenuConfigurationComponent } from './my-tasks-menu-configuration.component';

describe('MyTasksMenuConfigurationComponent', () => {
  let component: MyTasksMenuConfigurationComponent;
  let fixture: ComponentFixture<MyTasksMenuConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTasksMenuConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTasksMenuConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
