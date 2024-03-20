import { TestBed } from '@angular/core/testing';

import { AppearanceInspectionService } from './appearance-inspection.service';

describe('AppearanceInspectionService', () => {
  let service: AppearanceInspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppearanceInspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
