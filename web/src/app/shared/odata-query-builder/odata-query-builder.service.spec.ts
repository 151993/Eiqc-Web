import { TestBed, inject } from '@angular/core/testing';

import { OdataQueryBuilderService } from './odata-query-builder.service';

describe('OdataQueryBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OdataQueryBuilderService]
    });
  });

  it('should be created', inject([OdataQueryBuilderService], (service: OdataQueryBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
