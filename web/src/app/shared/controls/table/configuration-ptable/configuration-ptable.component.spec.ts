import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationPtableComponent } from './configuration-ptable.component';

describe('ConfigurationPtableComponent', () => {
  let component: ConfigurationPtableComponent;
  let fixture: ComponentFixture<ConfigurationPtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationPtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationPtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
