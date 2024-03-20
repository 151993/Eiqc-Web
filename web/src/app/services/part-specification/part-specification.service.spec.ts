
import { TestBed, inject } from '@angular/core/testing';

import { PartSpecificationService } from './part-specification.service';

describe('PartSpecificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartSpecificationService]
    });
  });

  it('should be created', inject([PartSpecificationService], (service: PartSpecificationService) => {
    expect(service).toBeTruthy();
  }));
});
