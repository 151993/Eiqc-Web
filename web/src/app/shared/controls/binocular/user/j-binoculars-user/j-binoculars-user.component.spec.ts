import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JBinocularsUserComponent } from './j-binoculars-user.component';

describe('JcasAutoCompleteUserComponent', () => {
  let component: JBinocularsUserComponent;
  let fixture: ComponentFixture<JBinocularsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JBinocularsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JBinocularsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
