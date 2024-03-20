import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JAutoCompleteParameterTypeCodeComponent } from './j-auto-complete-parameter-type-code.component';


describe('JAutoComplete$EntityComponent', () => {
  let component: JAutoCompleteParameterTypeCodeComponent;
  let fixture: ComponentFixture<JAutoCompleteParameterTypeCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JAutoCompleteParameterTypeCodeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteParameterTypeCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
