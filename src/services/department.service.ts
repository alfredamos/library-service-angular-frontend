import { DepartmentDto } from "src/models/departments/department.model";
import { DataService } from "./data.service";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, take, tap } from "rxjs";
import { departmentsUrl } from "src/utils/department.routes";

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends DataService<DepartmentDto> {
  private departmentsSubject = new BehaviorSubject<DepartmentDto[]>([]);
  departments$ = this.departmentsSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.loadDepartments();
  }

  loadDepartments() {
    this.findAll(departmentsUrl)
      .pipe(
        tap((departments) => {
          this.updateDepartments$(departments);
        }),
        take(1)
      )
      .subscribe();
  }

  getDepartments(): DepartmentDto[] {
    return this.departmentsSubject.getValue();
  }

  updateDepartments$(value: DepartmentDto[]) {
    this.departmentsSubject.next(value);
  }

  addDepartment(department: DepartmentDto): Observable<DepartmentDto> {
    return this.create(departmentsUrl, department).pipe(
      tap((department) => {
        const departments = this.departmentsSubject.getValue();
        const newDepartments = [...departments, department];
        this.updateDepartments$(newDepartments);
      })
    );
  }

  updateDepartment(
    id: string,
    department: DepartmentDto
  ): Observable<DepartmentDto> {
    return this.update(`${departmentsUrl}/${id}`, department).pipe(
      tap((editedDepartment) => {
        const departments = this.departmentsSubject.getValue();
        const editedDepartments = departments.map((department) =>
          department.id === editedDepartment.id ? editedDepartment : department
        );
        this.updateDepartments$(editedDepartments);
      })
    );
  }

  deleteDepartment(id: string): Observable<DepartmentDto> {
    return this.remove(`${departmentsUrl}/${id}`).pipe(
      tap((deletedDepartment) => {
        const departments = this.departmentsSubject.getValue();
        const filteredDepartments = departments.filter(
          (department) => department.id !== deletedDepartment.id
        );
        this.updateDepartments$(filteredDepartments);
      })
    );
  }
}
