import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, tap, take } from 'rxjs';
import { DepartmentDto } from 'src/models/departments/department.model';
import { DepartmentService } from 'src/services/department.service';
import { departmentsUrl } from 'src/utils/department.routes';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
})
export class EditDepartmentComponent implements OnInit{
  departmentForm: FormGroup;
  formName = 'Edit';
  departments: DepartmentDto[] = [];
  id = '';

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.departmentForm = fb.group({
      name: [''],
      faculty: ['']
    });
  }

  ngOnInit(): void {
    combineLatest([this.departmentService.departments$, this.route.paramMap])
      .pipe(
        map(([departments, paraMap]) => {
          this.id = paraMap.get('id')!;
          this.departments = departments;
          return departments.find((department) => department.id === this.id);
        }),
        tap((department) => {
          this.departmentForm.patchValue({
            name: department?.name,
            faculty: department?.faculty
          });
        }),
        take(1)
      )
      .subscribe();
  }

  departmentSubmit(departmentDto: DepartmentDto): void {
    departmentDto.id = this.id;

    this.departmentService
      .update(`${departmentsUrl}/${this.id}`, departmentDto)
      .pipe(
        tap((editedDepartment) => {
          const allDepartments = this.departments.map((department) =>
            department.id === editedDepartment?.id ? editedDepartment : department
          );
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
