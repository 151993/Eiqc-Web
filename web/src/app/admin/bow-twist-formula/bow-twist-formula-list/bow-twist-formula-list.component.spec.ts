import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowTwistFormulaListComponent } from './bow-twist-formula-list.component';

describe('BowTwistFormulaListComponent', () => {
  let component: BowTwistFormulaListComponent;
  let fixture: ComponentFixture<BowTwistFormulaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BowTwistFormulaListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowTwistFormulaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
