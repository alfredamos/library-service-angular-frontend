import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { EditProfileDto } from 'src/models/auth/edit-profile.model';
import { AuthService } from 'src/services/auth.service';
import { editProfileUrl } from 'src/utils/auth.routes';
import { DepartmentService } from 'src/services/department.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  departments$ = this.departmentService.departments$;
  currentUser = this.authService.getCurrentUser();

  constructor(
    private authService: AuthService,
    private departmentService: DepartmentService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.editProfileForm = fb.group({
      name: [''],
      email: [''],
      phone: [''],
      departmentId: [''],
      gender: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.editProfileForm.patchValue({
      name: this.currentUser.name,
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      departmentId: this.currentUser.departmentId,
      gender: this.currentUser.gender,
      password: '',
    });
  }

  editProfileSubmit(editProfileDto: EditProfileDto): void {
    this.authService
      .update(`${editProfileUrl}/edit-profile`, editProfileDto)
      .pipe(take(1))
      .subscribe((authUser) => this.router.navigate(['/']));
  }

  backToList() {
    this.router.navigate(['/']);
  }
}
