import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplateEditGuideComponent } from './email-template-edit-guide.component';

describe('EmailTemplateEditGuideComponent', () => {
  let component: EmailTemplateEditGuideComponent;
  let fixture: ComponentFixture<EmailTemplateEditGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTemplateEditGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTemplateEditGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
