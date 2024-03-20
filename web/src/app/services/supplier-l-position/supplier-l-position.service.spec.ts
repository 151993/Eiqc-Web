
import { TestBed, inject } from '@angular/core/testing';

import { SupplierLPositionService } from './supplier-l-position.service';

describe('SupplierLPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierLPositionService]
    });
  });

  it('should be created', inject([SupplierLPositionService], (service: SupplierLPositionService) => {
    expect(service).toBeTruthy();
  }));
});
