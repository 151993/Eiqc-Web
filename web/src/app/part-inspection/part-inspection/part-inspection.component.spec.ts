import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartInspectionComponent } from './part-inspection.component';

describe('PartInspectionComponent', () => {
  let component: PartInspectionComponent;
  let fixture: ComponentFixture<PartInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
