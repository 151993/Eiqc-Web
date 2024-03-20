import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartSpecAttachmentViewComponent } from './part-spec-attachment-view.component';

describe('PartSpecAttachmentViewComponent', () => {
  let component: PartSpecAttachmentViewComponent;
  let fixture: ComponentFixture<PartSpecAttachmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartSpecAttachmentViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartSpecAttachmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
