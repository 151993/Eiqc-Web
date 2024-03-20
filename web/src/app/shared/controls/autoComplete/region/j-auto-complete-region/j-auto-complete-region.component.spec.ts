import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteRegionComponent } from './j-auto-complete-region.component';

describe('JAutoCompleteRegionComponent', () => {
  let component: JAutoCompleteRegionComponent;
  let fixture: ComponentFixture<JAutoCompleteRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
