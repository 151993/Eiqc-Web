import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteProductLifeCycleStageComponent } from './j-auto-complete-product-life-cycle-stage.component';

describe('JAutoCompleteProductLifeCycleStageComponent', () => {
  let component: JAutoCompleteProductLifeCycleStageComponent;
  let fixture: ComponentFixture<JAutoCompleteProductLifeCycleStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JAutoCompleteProductLifeCycleStageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteProductLifeCycleStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
