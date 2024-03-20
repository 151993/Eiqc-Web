
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterTypeCodeDetailComponent } from './parameter-type-code-detail.component';

describe('ParameterTypeCodeDetailComponent', () => {
  let component: ParameterTypeCodeDetailComponent;
  let fixture: ComponentFixture<ParameterTypeCodeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParameterTypeCodeDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterTypeCodeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
