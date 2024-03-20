import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartSpecViewComponent } from './part-spec-view.component';

describe('PartSpecViewComponent', () => {
  let component: PartSpecViewComponent;
  let fixture: ComponentFixture<PartSpecViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartSpecViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartSpecViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
