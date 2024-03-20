/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService]
    });
  });

  it('should be created', inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }));
});
