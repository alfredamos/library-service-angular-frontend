import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { ChangePasswordFormComponent } from './forms/change-password-form/change-password-form.component';
import { EditProfileFormComponent } from './forms/edit-profile-form/edit-profile-form.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { MustLoginComponent } from './must-login/must-login.component';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';



@NgModule({
  declarations: [
    ChangePasswordComponent,
    EditProfileComponent,
    LoginComponent,
    SignupComponent,
    LoginFormComponent,
    ChangePasswordFormComponent,
    EditProfileFormComponent,
    SignupFormComponent,
    LogoutComponent,
    HomeComponent,
    MustLoginComponent,
    NotAllowedComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AuthModule { }
