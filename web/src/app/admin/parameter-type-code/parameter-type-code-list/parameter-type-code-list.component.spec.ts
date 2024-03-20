
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterTypeCodeListComponent } from './parameter-type-code-list.component';

describe('ParameterTypeCodeListComponent', () => {
  let component: ParameterTypeCodeListComponent;
  let fixture: ComponentFixture<ParameterTypeCodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParameterTypeCodeListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterTypeCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
