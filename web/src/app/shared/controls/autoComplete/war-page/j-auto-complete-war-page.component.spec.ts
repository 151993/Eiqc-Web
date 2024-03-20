
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteWarPageComponent } from './j-auto-complete-war-page.component';

describe('JAutoComplete$EntityComponent', () => {
  let component: JAutoCompleteWarPageComponent;
  let fixture: ComponentFixture<JAutoCompleteWarPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteWarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteWarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
