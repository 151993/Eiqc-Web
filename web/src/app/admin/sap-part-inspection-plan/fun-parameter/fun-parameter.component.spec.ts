import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunParameterComponent } from './fun-parameter.component';

describe('FunParameterComponent', () => {
  let component: FunParameterComponent;
  let fixture: ComponentFixture<FunParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
