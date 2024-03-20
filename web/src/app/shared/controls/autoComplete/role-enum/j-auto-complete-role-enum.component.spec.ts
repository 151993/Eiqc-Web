
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteRoleEnumComponent } from './j-auto-complete-role-enum.component';

describe('JAutoComplete$EntityComponent', () => {
  let component: JAutoCompleteRoleEnumComponent;
  let fixture: ComponentFixture<JAutoCompleteRoleEnumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteRoleEnumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteRoleEnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
