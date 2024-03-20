/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { PartCAFService } from './part-caf.service';

describe('PartCAFService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartCAFService]
    });
  });

  it('should be created', inject([PartCAFService], (service: PartCAFService) => {
    expect(service).toBeTruthy();
  }));
});
