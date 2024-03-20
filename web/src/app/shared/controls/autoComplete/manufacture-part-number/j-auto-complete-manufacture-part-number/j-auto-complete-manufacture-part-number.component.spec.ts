import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JAutoCompleteManuFacturePartNumberComponent } from './j-auto-complete-manufacture-part-number.component';

describe('JAutoCompleteCommoditynameComponent', () => {
  let component: JAutoCompleteManuFacturePartNumberComponent;
  let fixture: ComponentFixture<JAutoCompleteManuFacturePartNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteManuFacturePartNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteManuFacturePartNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
