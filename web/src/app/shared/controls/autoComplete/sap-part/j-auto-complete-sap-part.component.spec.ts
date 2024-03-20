import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JAutoCompleteSAPPartComponent } from './j-auto-complete-sap-part.component';



describe('JAutoCompleteSAPPartComponent', () => {
  let component: JAutoCompleteSAPPartComponent;
  let fixture: ComponentFixture<JAutoCompleteSAPPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteSAPPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteSAPPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
