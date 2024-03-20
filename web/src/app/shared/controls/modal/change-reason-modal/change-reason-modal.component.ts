import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ChangeReasonButton } from 'src/app/shared/constant/global';
import { validateWhiteSpace } from 'src/app/shared/validators/sharedValidators';

@Component({
  selector: 'app-change-reason-modal',
  templateUrl: './change-reason-modal.component.html',
  styleUrls: ['./change-reason-modal.component.css']
})
export class ChangeReasonModalComponent implements OnInit {
  @Input()
  public set changeReason(_message: string) {
    if (_message && _message.length > 0) {
      this.formInput.patchValue({
        changeReason: _message
      });
      this.formInput.controls['changeReason'].markAsDirty();
    }
  }
  public get changeReason(): string {
    return this.formInput.controls['changeReason'].value;
  }

  _defaultButtonText = ChangeReasonButton.Save;
  @Input()
  public set buttonText(_text: ChangeReasonButton) {
    if (_text && _text.length > 0) {
      this._defaultButtonText = _text;
    }
  }
  public get buttonText(): ChangeReasonButton {
    return this._defaultButtonText;
  }

  formInput: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.formInput = this.formBuilder.group({
      changeReason: new FormControl('', [
        Validators.required,
        Validators.maxLength(256),
        validateWhiteSpace
      ])
    });
  }

  ngOnInit() {}
}
