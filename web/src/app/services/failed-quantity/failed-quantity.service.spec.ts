import { TestBed } from '@angular/core/testing';

import { FailedQuantityService } from './failed-quantity.service';

describe('FailedQuantityService', () => {
  let service: FailedQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FailedQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
