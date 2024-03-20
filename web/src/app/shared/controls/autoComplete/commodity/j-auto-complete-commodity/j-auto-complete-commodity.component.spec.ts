import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteCommodityComponent } from './j-auto-complete-commodity.component';

describe('JAutoCompleteCommodityComponent', () => {
  let component: JAutoCompleteCommodityComponent;
  let fixture: ComponentFixture<JAutoCompleteCommodityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteCommodityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
