import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JAutoCompleteBowTwistFormulaComponent } from './j-auto-complete-bow-twist-formula.component';

describe('JAutoCompleteCommoditynameComponent', () => {
  let component: JAutoCompleteBowTwistFormulaComponent;
  let fixture: ComponentFixture<JAutoCompleteBowTwistFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JAutoCompleteBowTwistFormulaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteBowTwistFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
