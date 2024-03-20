import { TestBed } from '@angular/core/testing';

import { MaterialGroupService } from './material-group.service';

describe('MaterialGroupService', () => {
  let service: MaterialGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
