import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartDrawingAttachmentViewComponent } from './part-drawing-attachment-view.component';


describe('PartDrawingAttachmentViewComponent', () => {
  let component: PartDrawingAttachmentViewComponent;
  let fixture: ComponentFixture<PartDrawingAttachmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartDrawingAttachmentViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartDrawingAttachmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
