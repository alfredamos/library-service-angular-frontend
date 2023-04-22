import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordDto } from 'src/models/auth/change-password.model';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent {
  @Input() changePasswordForm: FormGroup;
  @Output() onChangePasswordSubmit = new EventEmitter<ChangePasswordDto>()
  @Output() onBackToList = new EventEmitter<void>();

  constructor(fb: FormBuilder){
    this.changePasswordForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      newPassword: [
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

  changePasswordSubmit(): void{
    this.onChangePasswordSubmit.emit(this.changePasswordForm.value)
  }

  backToList(){
    this.onBackToList.emit();
  }
}
