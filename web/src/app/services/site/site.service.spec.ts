/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { SiteService } from './site.service';

describe('SiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteService]
    });
  });

  it('should be created', inject([SiteService], (service: SiteService) => {
    expect(service).toBeTruthy();
  }));
});
