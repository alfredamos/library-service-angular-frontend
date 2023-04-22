import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentDto } from 'src/models/departments/department.model';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
})
export class DepartmentFormComponent {
  @Input() departmentForm: FormGroup;
  @Input() formName = '';
  @Output() onDepartmentSubmit = new EventEmitter<DepartmentDto>();
  @Output() onBackToList = new EventEmitter<void>();

  constructor(fb: FormBuilder) {
    this.departmentForm = fb.group({
      name: ['', Validators.required],
      faculty: ['', Validators.required]
    });
  }

  departmentSubmit() {
    this.onDepartmentSubmit.emit(this.departmentForm.value);
  }

  backToList() {
    this.onBackToList.emit();
  }
}
