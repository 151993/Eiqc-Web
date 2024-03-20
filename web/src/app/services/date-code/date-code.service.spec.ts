
import { TestBed, inject } from '@angular/core/testing';

import { DateCodeService } from './date-code.service';

describe('DateCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateCodeService]
    });
  });

  it('should be created', inject([DateCodeService], (service: DateCodeService) => {
    expect(service).toBeTruthy();
  }));
});
