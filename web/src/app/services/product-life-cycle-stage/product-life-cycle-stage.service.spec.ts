import { TestBed } from '@angular/core/testing';

import { ProductLifeCycleStageService } from './product-life-cycle-stage.service';

describe('ProductLifeCycleStageService', () => {
  let service: ProductLifeCycleStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductLifeCycleStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
