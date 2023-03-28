import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SendCodeComponent } from './send-code/send-code.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { MaterialBundleModule } from 'src/app/core/material-bundle/material-bundle.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    SendCodeComponent,
    RecoverPasswordComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialBundleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
