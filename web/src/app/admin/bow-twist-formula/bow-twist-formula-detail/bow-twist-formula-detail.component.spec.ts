
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowTwistFormulaDetailComponent } from './bow-twist-formula-detail.component';

describe('BowTwistFormulaDetailComponent', () => {
  let component: BowTwistFormulaDetailComponent;
  let fixture: ComponentFixture<BowTwistFormulaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BowTwistFormulaDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowTwistFormulaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
