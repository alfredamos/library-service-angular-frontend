import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupDto } from 'src/models/auth/signup.model';
import { DepartmentDto } from 'src/models/departments/department.model';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  @Input()signupForm: FormGroup;
  @Input() departments: DepartmentDto[] | null = [];
  @Output() onSignupSubmit = new EventEmitter<SignupDto>();
  @Output() onBackToList = new EventEmitter<void>();

  constructor(fb: FormBuilder) {
    this.signupForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      departmentId: ['', Validators.required],
      gender: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  signupSubmit(): void {

  }

  backToList() {

  }
}
