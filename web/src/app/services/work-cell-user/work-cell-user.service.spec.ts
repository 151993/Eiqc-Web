/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { WorkCellUserService } from './work-cell-user.service';

describe('WorkCellUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkCellUserService]
    });
  });

  it('should be created', inject([WorkCellUserService], (service: WorkCellUserService) => {
    expect(service).toBeTruthy();
  }));
});
