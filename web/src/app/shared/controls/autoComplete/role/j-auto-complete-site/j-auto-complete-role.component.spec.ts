import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteRoleComponent } from './j-auto-complete-role.component';

describe('JAutoCompleteRoleComponent', () => {
  let component: JAutoCompleteRoleComponent;
  let fixture: ComponentFixture<JAutoCompleteRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
