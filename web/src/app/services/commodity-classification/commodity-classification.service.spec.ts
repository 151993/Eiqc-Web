/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';
import { CommodityClassificationService } from './commodity-classification.service';

describe('CommodityCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommodityClassificationService]
    });
  });

  it('should be created', inject([CommodityClassificationService], (service: CommodityClassificationService) => {
    expect(service).toBeTruthy();
  }));
});
