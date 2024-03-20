
import { TestBed, inject } from '@angular/core/testing';

import { SupplierSamplingPlanService } from './supplier-sampling-plan.service';

describe('SupplierSamplingPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierSamplingPlanService]
    });
  });

  it('should be created', inject([SupplierSamplingPlanService], (service: SupplierSamplingPlanService) => {
    expect(service).toBeTruthy();
  }));
});
