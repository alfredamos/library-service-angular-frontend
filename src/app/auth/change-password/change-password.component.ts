import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import { ChangePasswordDto } from 'src/models/auth/change-password.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { changePasswordUrl } from 'src/utils/auth.routes';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassword: FormGroup;
  currentUser = this.authService.getCurrentUser();

  constructor(private authService: AuthService,
    private router: Router,
    fb: FormBuilder){
    this.changePassword = fb.group({
      email: [''],
      password: [''],
      newPassword: [''],
      confirmPassword: [''],
    })
  }

  ngOnInit(): void {
    this.changePassword.patchValue({
      email: this.currentUser.email,
      password: "",
      newPassword: "",
      confirmPassword: ""
    })
  }

  changePasswordSubmit(changePasswordDto: ChangePasswordDto): void{
    this.authService.update(`${changePasswordUrl}/change-password`, changePasswordDto).pipe(
      take(1)
    ).subscribe(authUser => this.router.navigate(['/']))
  }

  backToList(){
    this.router.navigate(['/']);
  }
}
