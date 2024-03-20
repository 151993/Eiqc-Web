
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleSizeCalculationListComponent } from './sample-size-calculation-list.component';


describe('SampleSizeCalculationListComponent', () => {
  let component: SampleSizeCalculationListComponent;
  let fixture: ComponentFixture<SampleSizeCalculationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleSizeCalculationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleSizeCalculationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
