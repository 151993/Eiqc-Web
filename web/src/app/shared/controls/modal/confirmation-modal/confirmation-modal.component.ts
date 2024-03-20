import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  defaultMessage = 'Message.AreYouSure';
  @Input()
  public set message(_message: string) {
    if (_message && _message.length > 0) {
      this.defaultMessage = _message;
    }
  }
  public get message(): string {
    return this.defaultMessage;
  }

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
