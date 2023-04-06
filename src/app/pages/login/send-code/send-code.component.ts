import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-send-code',
  templateUrl: './send-code.component.html',
  styleUrls: [
    './../../../core/shared/scss/login-form-style.shared.scss',
    './send-code.component.scss',
  ],
})
export class SendCodeComponent {
  @Input() form: {
    email: string;
    password: string;
    fullName: string;
    code: string;
    newPassword: string;
  } = {
    email: '',
    password: '',

    fullName: '',

    code: '',
    newPassword: '',
  };
  @Output() formChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() onGoToSignIn: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();

  passwordToogleVisibility = true;

  getControl(ngForm: NgForm, control: string) {
    return ngForm.form.get(control);
  }

  getErrorMessage(ngForm: NgForm, control: string) {
    const controlForm = this.getControl(ngForm, control);

    if (!controlForm) {
      return '';
    }

    if (controlForm.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (controlForm.hasError('email')) {
      return 'Email inválido';
    }
    if (controlForm.hasError('minlength')) {
      return 'Mínimo de 6 caracteres';
    }
    if (controlForm.hasError('maxlength')) {
      return 'Máximo de 20 caracteres';
    }
    return '';
  }

  changeFormValue() {
    this.formChange.emit(this.form);
  }

  goToSignIn() {
    console.log('goToSignUp');
    this.onGoToSignIn.emit();
  }

  submit() {
    console.log(this.form);
    this.onSubmit.emit();
  }
}
