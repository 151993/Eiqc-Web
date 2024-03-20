
import { TestBed, inject } from '@angular/core/testing';

import { SupplierMPositionService } from './supplier-m-position.service';

describe('SupplierMPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierMPositionService]
    });
  });

  it('should be created', inject([SupplierMPositionService], (service: SupplierMPositionService) => {
    expect(service).toBeTruthy();
  }));
});
