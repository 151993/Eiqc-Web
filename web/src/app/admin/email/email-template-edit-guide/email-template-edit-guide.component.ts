import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-template-edit-guide',
  templateUrl: './email-template-edit-guide.component.html',
  styleUrls: ['./email-template-edit-guide.component.css']
})
export class EmailTemplateEditGuideComponent implements OnInit {

  @Input() dataSource = [];
  @Output() closeGuideEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  closeGuide() {
    this.closeGuideEvent.emit(true);
  }
}
