import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentDto } from 'src/models/departments/department.model';
import { DepartmentService } from 'src/services/department.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css'],
})
export class ListDepartmentComponent{
  departments$ = this.departmentService.departments$;

  constructor(private departmentService: DepartmentService) {}

}
