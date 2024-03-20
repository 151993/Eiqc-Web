import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartTestReportAttachmentViewComponent } from './part-test-report-attachment-view.component';


describe('PartTestReportAttachmentViewComponent', () => {
  let component: PartTestReportAttachmentViewComponent;
  let fixture: ComponentFixture<PartTestReportAttachmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartTestReportAttachmentViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartTestReportAttachmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
