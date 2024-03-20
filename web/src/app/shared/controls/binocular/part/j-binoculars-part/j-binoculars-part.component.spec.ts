import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JBinocularsPartComponent } from './j-binoculars-part.component';

describe('JBinocularsPartComponent', () => {
  let component: JBinocularsPartComponent;
  let fixture: ComponentFixture<JBinocularsPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JBinocularsPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JBinocularsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
