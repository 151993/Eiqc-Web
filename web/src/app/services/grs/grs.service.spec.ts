/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { GRSService } from './grs.service';

describe('GRSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GRSService]
    });
  });

  it('should be created', inject([GRSService], (service: GRSService) => {
    expect(service).toBeTruthy();
  }));
});
