import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierTestReportAttachmentViewComponent } from './supplier-test-report-attachment-view.component';


describe('SupplierTestReportAttachmentViewComponent', () => {
  let component: SupplierTestReportAttachmentViewComponent;
  let fixture: ComponentFixture<SupplierTestReportAttachmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierTestReportAttachmentViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierTestReportAttachmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
