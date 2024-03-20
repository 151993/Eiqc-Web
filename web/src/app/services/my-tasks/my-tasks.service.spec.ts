/* Auto Generated Code By AutoCodeGen Jabil © 2019 */

import { TestBed, inject } from '@angular/core/testing';
import { MyTasksService } from './my-tasks.service';

describe('MyTasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTasksService]
    });
  });

  it('should be created', inject([MyTasksService], (service: MyTasksService) => {
    expect(service).toBeTruthy();
  }));
});
