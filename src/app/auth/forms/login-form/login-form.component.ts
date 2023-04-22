import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ɵEmptyOutletComponent } from '@angular/router';
import { LoginDto } from 'src/models/auth/login.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Input()loginForm: FormGroup;
  @Output() onLoginSubmit = new EventEmitter<LoginDto>();
  @Output() onBackToList = new EventEmitter<void>();

  constructor(fb: FormBuilder){
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  loginSubmit(){
    this.onLoginSubmit.emit(this.loginForm.value);
  }

  backToList(){
    this.onBackToList.emit();
  }
}
