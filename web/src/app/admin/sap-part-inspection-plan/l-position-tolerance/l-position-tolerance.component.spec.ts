import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LPositionToleranceComponent } from './l-position-tolerance.component';

describe('LPositionToleranceComponent', () => {
  let component: LPositionToleranceComponent;
  let fixture: ComponentFixture<LPositionToleranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LPositionToleranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LPositionToleranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
