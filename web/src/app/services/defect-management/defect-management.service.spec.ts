/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { DefectManagementService } from './defect-management.service';

describe('DefectManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefectManagementService]
    });
  });

  it('should be created', inject([DefectManagementService], (service: DefectManagementService) => {
    expect(service).toBeTruthy();
  }));
});
