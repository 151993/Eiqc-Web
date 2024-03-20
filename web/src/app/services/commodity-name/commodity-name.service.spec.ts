import { TestBed } from '@angular/core/testing';

import { CommodityNameService } from './commodity-name.service';

describe('CommodityNameService', () => {
  let service: CommodityNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommodityNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
