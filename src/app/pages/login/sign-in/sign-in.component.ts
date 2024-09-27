import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
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
  @Input() showSignIn = true;

  @Output() formChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() onGoToSignUp: EventEmitter<void> = new EventEmitter<void>();
  @Output() onGoToForgotPassword: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();

  passwordToogleVisibility = true;
  constructor() {}

  getControl(ngForm: NgForm, control: string) {
    return ngForm.form.get(control);
  }

  resetForm() {
    this.form = {
      email: '',
      password: '',
      fullName: '',
      code: '',
      newPassword: '',
    };
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

  goToSignUp() {
    // console.log('goToSignUp');
    this.resetForm();
    this.changeFormValue();
    this.onGoToSignUp.emit();
  }
  goToForgotPassword() {
    // console.log('goToForgotPassword');
    this.onGoToForgotPassword.emit();
  }

  submit() {
    console.log(this.form);
    this.onSubmit.emit();
  }
}
