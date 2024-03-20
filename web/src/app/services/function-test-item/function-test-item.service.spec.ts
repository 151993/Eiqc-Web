import { TestBed } from '@angular/core/testing';

import { FunctionTestItemService } from './function-test-item.service';

describe('FunctionTestItemService', () => {
  let service: FunctionTestItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionTestItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
