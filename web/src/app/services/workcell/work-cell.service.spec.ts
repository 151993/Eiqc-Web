import { TestBed } from '@angular/core/testing';

import { WorkCellService } from './work-cell.service';

describe('WorkCellService', () => {
  let service: WorkCellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkCellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
