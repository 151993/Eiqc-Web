import { TestBed, inject } from '@angular/core/testing';

import { ParameterManagementService } from './parameter-management.service';

describe('ParameterManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParameterManagementService]
    });
  });

  it('should be created', inject([ParameterManagementService], (service: ParameterManagementService) => {
    expect(service).toBeTruthy();
  }));
});
