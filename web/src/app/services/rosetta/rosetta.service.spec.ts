/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { RosettaService } from './rosetta.service';

describe('RosettaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RosettaService]
    });
  });

  it('should be created', inject([RosettaService], (service: RosettaService) => {
    expect(service).toBeTruthy();
  }));
});
