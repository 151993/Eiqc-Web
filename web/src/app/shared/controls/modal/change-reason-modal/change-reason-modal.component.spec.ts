import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeReasonModalComponent } from './change-reason-modal.component';

describe('ChangeReasonModalComponent', () => {
  let component: ChangeReasonModalComponent;
  let fixture: ComponentFixture<ChangeReasonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeReasonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeReasonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
