/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { TestBed, inject } from '@angular/core/testing';
import { SiteUserService } from './site-user.service';

describe('SiteSmeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteUserService]
    });
  });

  it('should be created', inject([SiteUserService], (service: SiteUserService) => {
    expect(service).toBeTruthy();
  }));
});
