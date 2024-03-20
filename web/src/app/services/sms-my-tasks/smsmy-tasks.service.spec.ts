import { TestBed } from '@angular/core/testing';

import { SMSMyTasksService } from './smsmy-tasks.service';

describe('SMSMyTasksService', () => {
  let service: SMSMyTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SMSMyTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
