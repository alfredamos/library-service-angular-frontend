import { departmentsUrl } from "src/utils/department.routes";
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SignupDto } from 'src/models/auth/signup.model';
import { DepartmentDto } from 'src/models/departments/department.model';
import { AuthService } from 'src/services/auth.service';
import { signupUrl } from 'src/utils/auth.routes';
import { DepartmentService } from "src/services/department.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  departments$ = this.departmentService.departments$;

  constructor(
    private authService: AuthService,
    private departmentService: DepartmentService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.signupForm = fb.group({
      name: [''],
      email: [''],
      phone: [''],
      departmentId: [''],
      gender: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  signupSubmit(signupDto: SignupDto): void {
    this.authService
      .update(`${signupUrl}/edit-profile`, signupDto)
      .pipe(take(1))
      .subscribe((authUser) => this.router.navigate(['/']));
  }

  backToList() {
    this.router.navigate(['/']);
  }
}
