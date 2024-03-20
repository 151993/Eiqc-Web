import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JAutoCompleteMaterialGroupComponent } from './j-auto-complete-material-group.component';

describe('JAutoCompleteMaterialGroupComponent', () => {
  let component: JAutoCompleteMaterialGroupComponent;
  let fixture: ComponentFixture<JAutoCompleteMaterialGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAutoCompleteMaterialGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JAutoCompleteMaterialGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
