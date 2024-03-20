import { TestBed } from '@angular/core/testing';

import { ParameterManagmentTypeService } from './parameter-managment-type.service';

describe('ParameterManagmentTypeService', () => {
  let service: ParameterManagmentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParameterManagmentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
