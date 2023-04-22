import { AuthUser } from 'src/models/auth/auth-user.model';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordDto } from 'src/models/auth/change-password.model';
import { LoginDto } from 'src/models/auth/login.model';
import { SignupDto } from 'src/models/auth/signup.model';
import { EditProfileDto } from 'src/models/auth/edit-profile.model';
import { BehaviorSubject } from 'rxjs';
import { CurrentUserDto } from 'src/models/auth/current-user.model';
import { UserType } from 'src/models/auth/user-type.model';

type Auth = ChangePasswordDto | EditProfileDto | LoginDto | SignupDto;

@Injectable({
  providedIn: 'root',
})
export class AuthService extends DataService<Auth> {
  private authUserSubject = new BehaviorSubject<AuthUser>(this.initialUser());
  authUser$ = this.authUserSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<CurrentUserDto>(null!);
  currentUser$ = this.currentUserSubject.asObservable();

  updateAuthUser$(value: AuthUser) {
    this.authUserSubject.next(value);
    this.currentUserSubject.next(value.user!);
  }

  getAuthUser(): AuthUser {
    return this.authUserSubject.getValue();
  }

  getCurrentUser(): CurrentUserDto{
    return this.currentUserSubject.getValue();
  }

  setJwtToken(token: string) {
    localStorage.setItem('token', token);
  }

  getJwtToken(): string {
    return localStorage.getItem('token')!;
  }

  removeJwtToken() {
    localStorage.removeItem('token');
  }

  login(value: AuthUser) {
    this.updateAuthUser$(value);
    this.setJwtToken(value.token!);
  }

  logout() {
    this.updateAuthUser$(this.initialUser());
    this.removeJwtToken();
  }

  initialUser() {
    return {
      id: '',
      name: '',
      userType: UserType.Student,
      token: '',
      isLoggedIn: false,
      message: 'Not logged-in',
    };
  }
}
