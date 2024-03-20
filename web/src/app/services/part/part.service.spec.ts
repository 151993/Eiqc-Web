/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { PartService } from './part.service';

describe('PartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartService]
    });
  });

  it('should be created', inject([PartService], (service: PartService) => {
    expect(service).toBeTruthy();
  }));
});
