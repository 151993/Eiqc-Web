import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JAutoCompleteSupplierUserComponent } from './j-auto-complete-supplier-user.component';

describe('JAutoCompleteSupplierUserComponent', () => {
  let component: JAutoCompleteSupplierUserComponent;
  let fixture: ComponentFixture<JAutoCompleteSupplierUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JAutoCompleteSupplierUserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteSupplierUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
