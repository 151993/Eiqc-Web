
import { TestBed, inject } from '@angular/core/testing';
import { PartDrawingService } from './part-drawing.service';


describe('PartDrawingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartDrawingService]
    });
  });

  it('should be created', inject([PartDrawingService], (service: PartDrawingService) => {
    expect(service).toBeTruthy();
  }));
});
