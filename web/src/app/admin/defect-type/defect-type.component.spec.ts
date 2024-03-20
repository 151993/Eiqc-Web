import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DefectTypeComponent } from './defect-type.component';

describe('DefectTypeComponent', () => {
  let component: DefectTypeComponent;
  let fixture: ComponentFixture<DefectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
