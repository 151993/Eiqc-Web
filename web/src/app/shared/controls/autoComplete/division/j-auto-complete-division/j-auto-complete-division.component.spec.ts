import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteDivisionComponent } from './j-auto-complete-division.component';

describe('JAutoCompleteDivisionComponent', () => {
  let component: JAutoCompleteDivisionComponent;
  let fixture: ComponentFixture<JAutoCompleteDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
