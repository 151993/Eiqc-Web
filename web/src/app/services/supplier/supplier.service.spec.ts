/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { SupplierService } from './supplier.service';

describe('SupplierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierService]
    });
  });

  it('should be created', inject([SupplierService], (service: SupplierService) => {
    expect(service).toBeTruthy();
  }));
});
