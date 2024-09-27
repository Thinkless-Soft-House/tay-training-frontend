import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { AuthService } from 'src/app/services/auth.service';

enum LoginType {
  LOGIN,
  REGISTER,
  SEND_CODE,
  RESET_PASSWORD,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginType = LoginType;
  atualView = LoginType.LOGIN;
  showSignIn = false;

  form = {
    email: '',
    password: '',

    fullName: '',

    code: '',
    newPassword: '',
  };

  constructor(
    private messangerService: MessengerService,
    private router: Router,
    private authService: AuthService
  ) {}

  formChange(form: any) {
    this.form = form;
  }

  changeView(view: LoginType) {
    this.atualView = view;
  }

  submitLogin() {
    console.log(`login submit`);

    switch (this.atualView) {
      case LoginType.LOGIN:
        this.submitSignIn();
        break;
      case LoginType.REGISTER:
        this.submitSignUp();
        break;
      case LoginType.SEND_CODE:
        this.submitSignSendCode();
        break;
      case LoginType.RESET_PASSWORD:
        this.submitSignRecoverPassword();
        break;

      default:
        break;
    }
  }

  private async submitSignIn() {
    console.log(`sign in submit`);

    const data = {
      email: this.form.email,
      password: this.form.password,
    };

    console.log('my data', data);

    // Try Login

    try {
      const r = await this.authService.login(
        this.form.email,
        this.form.password
      );
      console.log('r', r);

      this.router.navigate(['/']);
    } catch (error) {
      console.log('error', error);
      this.messangerService.errorMessage({
        message: (error as any).error.message || 'Erro no login',
        action: 'Voltar',
      });
    }
    // if (success) {

    // } else {
    //   this.messangerService.errorMessage({
    //     message: 'Email ou senha inválidos',
    //     action: 'Fechar',
    //   });
    // }
  }
  private submitSignUp() {
    console.log(`sign up submit`);

    const data = {
      email: this.form.email,
      password: this.form.password,
      fullName: this.form.fullName,
    };

    console.log('my data', data);

    // Try Sign Up

    // if (success) {
    //   this.changeView(LoginType.LOGIN);
    // } else {
    //   this.messangerService.errorMessage({
    //     message: 'Algum dos dados não é válido',
    //     action: 'Fechar',
    //   });
    // }
  }
  private submitSignSendCode() {
    console.log(`send code submit`);

    const data = {
      email: this.form.email,
      code: this.form.code,
    };

    // console.log('my data', data);

    // Try Sign Up

    // if (success) {
    this.changeView(LoginType.RESET_PASSWORD);
    // } else {
    //   this.messangerService.errorMessage({
    //     message: 'Algum dos dados não é válido',
    //     action: 'Fechar',
    //   });
    // }
  }
  private submitSignRecoverPassword() {
    console.log(`recover password submit`);

    const data = {
      email: this.form.email,
      code: this.form.code,
      newPassword: this.form.newPassword,
    };

    // console.log('my data', data);

    // Try Sign Up

    // if (success) {
    //   this.changeView(LoginType.LOGIN);
    // } else {
    //   this.messangerService.errorMessage({
    //     message: 'Algum dos dados não é válido',
    //     action: 'Fechar',
    //   });
    // }
  }
}
