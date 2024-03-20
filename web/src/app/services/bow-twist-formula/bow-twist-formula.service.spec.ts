import { TestBed, inject } from '@angular/core/testing';

import { BowTwistFormulaService } from './bow-twist-formula.service';

describe('BowTwistFormulaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BowTwistFormulaService]
    });
  });

  it('should be created', inject([BowTwistFormulaService], (service: BowTwistFormulaService) => {
    expect(service).toBeTruthy();
  }));
});
