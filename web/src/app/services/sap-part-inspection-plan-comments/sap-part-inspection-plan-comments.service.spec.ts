
import { TestBed, inject } from '@angular/core/testing';

import { SAPPartInspectionPlanCommentsService } from './sap-part-inspection-plan-comments.service';

describe('SAPPartInspectionPlanCommentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SAPPartInspectionPlanCommentsService]
    });
  });

  it('should be created', inject([SAPPartInspectionPlanCommentsService], (service: SAPPartInspectionPlanCommentsService) => {
    expect(service).toBeTruthy();
  }));
});
