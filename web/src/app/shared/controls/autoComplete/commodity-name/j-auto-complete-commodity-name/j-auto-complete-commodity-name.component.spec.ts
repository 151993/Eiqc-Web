import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JAutoCompleteCommodityNameComponent } from './j-auto-complete-commodity-name.component';

describe('JAutoCompleteCommoditynameComponent', () => {
  let component: JAutoCompleteCommodityNameComponent;
  let fixture: ComponentFixture<JAutoCompleteCommodityNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteCommodityNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteCommodityNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
