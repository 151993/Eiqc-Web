import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartDrawingViewComponent } from './part-drawing-view.component';


describe('PartDrawingViewComponent', () => {
  let component: PartDrawingViewComponent;
  let fixture: ComponentFixture<PartDrawingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartDrawingViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartDrawingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
