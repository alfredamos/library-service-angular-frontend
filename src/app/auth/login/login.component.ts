import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/models/auth/login.model';
import { AuthService } from '../../../services/auth.service';
import { loginUrl } from 'src/utils/auth.routes';
import { map, take, tap } from 'rxjs';
import { AuthUser } from 'src/models/auth/auth-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: [''],
      password: [''],
    });
  }

  loginSubmit(loginDto: LoginDto): void {
    this.authService
      .create(loginUrl, loginDto)
      .pipe(
        map((authResponse) => authResponse as unknown as AuthUser),
        tap((authUser) => {
          this.authService.login(authUser);
        }),
        take(1)
      )
      .subscribe((authUser) => this.router.navigate(['/']));
  }

  backToList(): void {
    this.router.navigate(['/']);
  }
}
