import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteFunctionTestItemComponent } from './j-auto-complete-function-test-item.component';

describe('JAutoCompleteFunctiontestitemComponent', () => {
  let component: JAutoCompleteFunctionTestItemComponent;
  let fixture: ComponentFixture<JAutoCompleteFunctionTestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteFunctionTestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteFunctionTestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
