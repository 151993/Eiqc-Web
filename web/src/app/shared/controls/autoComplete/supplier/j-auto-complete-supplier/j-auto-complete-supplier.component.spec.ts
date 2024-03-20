import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteSupplierComponent } from './j-auto-complete-supplier.component';

describe('JAutoCompleteSupplierComponent', () => {
  let component: JAutoCompleteSupplierComponent;
  let fixture: ComponentFixture<JAutoCompleteSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
