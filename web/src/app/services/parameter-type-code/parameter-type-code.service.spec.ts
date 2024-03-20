
import { TestBed, inject } from '@angular/core/testing';

import { ParameterTypeCodeService } from './parameter-type-code.service';

describe('ParameterTypeCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParameterTypeCodeService]
    });
  });

  it('should be created', inject([ParameterTypeCodeService], (service: ParameterTypeCodeService) => {
    expect(service).toBeTruthy();
  }));
});
