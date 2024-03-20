import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialGroupListComponent } from './material-group-list.component';

describe('MaterialGroupListComponent', () => {
  let component: MaterialGroupListComponent;
  let fixture: ComponentFixture<MaterialGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
