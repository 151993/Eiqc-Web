/* Auto Generated Code By AutoCodeGen Jabil © 2019 */


import { TestBed, inject } from '@angular/core/testing';

import { NonJabilUserService } from './non-jabil-user.service';

describe('NonJabilUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NonJabilUserService]
    });
  });

  it('should be created', inject([NonJabilUserService], (service: NonJabilUserService) => {
    expect(service).toBeTruthy();
  }));
});
