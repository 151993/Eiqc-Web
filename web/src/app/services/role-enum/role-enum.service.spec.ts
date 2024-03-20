
import { TestBed, inject } from '@angular/core/testing';

import { RoleEnumService } from './role-enum.service';

describe('RoleEnumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleEnumService]
    });
  });

  it('should be created', inject([RoleEnumService], (service: RoleEnumService) => {
    expect(service).toBeTruthy();
  }));
});
