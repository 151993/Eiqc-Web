import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MPositionToleranceComponent } from './m-position-tolerance.component';

describe('MPositionToleranceComponent', () => {
  let component: MPositionToleranceComponent;
  let fixture: ComponentFixture<MPositionToleranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MPositionToleranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MPositionToleranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
