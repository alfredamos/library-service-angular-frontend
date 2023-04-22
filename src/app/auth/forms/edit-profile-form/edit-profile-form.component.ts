import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditProfileDto } from 'src/models/auth/edit-profile.model';
import { DepartmentDto } from 'src/models/departments/department.model';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css'],
})
export class EditProfileFormComponent {
  @Input()editProfileForm: FormGroup;
  @Input()departments: DepartmentDto[] | null = [];
  @Output() onEditProfileSubmit = new EventEmitter<EditProfileDto>();
  @Output() onBackToList = new EventEmitter<void>();

  constructor(fb: FormBuilder) {
    this.editProfileForm = fb.group({
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      phone: ['', Validators.required],
      departmentId: ['', Validators.required],
      gender: [''],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  editProfileSubmit(): void {
   this.onEditProfileSubmit.emit(this.editProfileForm.value);
  }

  backToList() {
    this.onBackToList.emit();
  }
}
