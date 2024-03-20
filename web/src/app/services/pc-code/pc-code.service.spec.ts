/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { PCCodeService } from './pc-code.service';

describe('PCCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PCCodeService]
    });
  });

  it('should be created', inject([PCCodeService], (service: PCCodeService) => {
    expect(service).toBeTruthy();
  }));
});
