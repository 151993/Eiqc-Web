import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteCommodityCategoryComponent } from './j-auto-complete-commodity-category.component';

describe('JAutoCompleteCommoditycategoryComponent', () => {
  let component: JAutoCompleteCommodityCategoryComponent;
  let fixture: ComponentFixture<JAutoCompleteCommodityCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteCommodityCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteCommodityCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
