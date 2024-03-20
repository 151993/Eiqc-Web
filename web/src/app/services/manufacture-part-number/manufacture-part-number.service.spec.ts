import { TestBed } from '@angular/core/testing';

import { ManuFacturePartNumberService } from './manufacture-part-number.service';

describe('ManuFacturePartNumberService', () => {
  let service: ManuFacturePartNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManuFacturePartNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
