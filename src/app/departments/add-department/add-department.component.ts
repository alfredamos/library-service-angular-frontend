import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, take } from 'rxjs';
import { DepartmentDto } from 'src/models/departments/department.model';
import { DepartmentService } from 'src/services/department.service';
import { departmentsUrl } from 'src/utils/department.routes';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent implements OnInit{
  departments: DepartmentDto[] = [];
  departmentForm: FormGroup;
  formName = 'Create';

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.departmentForm = fb.group({
      name: [''],
      faculty: ['']
    });
  }

  ngOnInit(): void {
    this.departmentService.departments$
      .pipe(
        tap((departments) => (this.departments = departments)),
        take(1)
      )
      .subscribe();
  }

  departmentSubmit(departmentDto: DepartmentDto): void {
    this.departmentService
      .create(departmentsUrl, departmentDto)
      .pipe(
        tap((newDepartment) => {
          const allDepartments = [...this.departments, newDepartment];
          this.departmentService.updateDepartments$(allDepartments);
        }),
        take(1)
      )
      .subscribe((department) => this.router.navigate(['/departments']));
  }

  backToList(): void {
    this.router.navigate(['/departments']);
  }
}
