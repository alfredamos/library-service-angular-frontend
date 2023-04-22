import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartmentDto } from 'src/models/departments/department.model';

@Component({
  selector: 'app-single-department',
  templateUrl: './single-department.component.html',
  styleUrls: ['./single-department.component.css'],
})
export class SingleDepartmentComponent {
  @Input() department: DepartmentDto;
  @Input() isDelete = false;
  @Output() onBackToList = new EventEmitter<void>();
  @Output() onDeleteClick = new EventEmitter<void>();
  @Output() onEditClick = new EventEmitter<string>();

  constructor() {
    this.department = new DepartmentDto();
  }

  editClick(id: string) {
    this.onEditClick.emit(id);
  }

  deleteClick() {
    this.onDeleteClick.emit();
  }

  backToList() {
    this.onBackToList.emit();
  }
}
