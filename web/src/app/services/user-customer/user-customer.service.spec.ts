/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { UserCustomerService } from './user-customer.service';

describe('UserCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCustomerService]
    });
  });

  it('should be created', inject([UserCustomerService], (service: UserCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
