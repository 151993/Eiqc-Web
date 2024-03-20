/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { InstrumentTypeService } from './instrument-type.service';

describe('InstrumentTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstrumentTypeService]
    });
  });

  it('should be created', inject([InstrumentTypeService], (service: InstrumentTypeService) => {
    expect(service).toBeTruthy();
  }));
});
