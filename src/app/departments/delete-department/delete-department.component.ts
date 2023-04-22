import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, take, tap } from 'rxjs';
import { DepartmentDto } from 'src/models/departments/department.model';
import { DepartmentService } from 'src/services/department.service';
import { departmentsUrl } from 'src/utils/department.routes';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.css'],
})
export class DeleteDepartmentComponent {
  department = new DepartmentDto();
  departments: DepartmentDto[] = [];
  deleteTitle = '';
  deleteMessage = '';
  showDeleteItem = false;
  id = '';

  department$ = combineLatest([
    this.departmentService.departments$,
    this.route.paramMap,
  ]).pipe(
    map(([departments, paraMap]) => {
      this.id = paraMap.get('id')!;
      this.departments = departments;
      this.department = departments.find((department) => department.id === this.id)!;
      return this.department;
    })
  );

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteClick() {
    this.deleteMessage = `Do you really want to delete department : ${this.department.name}`;
    this.deleteTitle = 'Department Delete Confirmation';
    this.showDeleteItem = !this.showDeleteItem;
  }

  deleteDepartment(value: boolean) {
    if (value) {
      this.departmentService
        .remove(`${departmentsUrl}/${this.id}`)
        .pipe(
          tap(deletedDepartment => {
            const currentDepartments = this.departments.filter(department => department.id !== deletedDepartment.id);
            this.departmentService.updateDepartments$(currentDepartments);
          }),
          take(1)
          )
        .subscribe((deleteDepartment) => this.router.navigate(['/departments']));
    } else {
      this.router.navigate(['/departments']);
    }
  }

  editClick(id: string) {
    this.router.navigate([`/edit-department/${id}`]);
  }

  backToList() {
    this.router.navigate(['/departments']);
  }
}
