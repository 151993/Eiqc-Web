
import { TestBed, inject } from '@angular/core/testing';

import { WarPageService } from './war-page.service';

describe('WarPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarPageService]
    });
  });

  it('should be created', inject([WarPageService], (service: WarPageService) => {
    expect(service).toBeTruthy();
  }));
});
