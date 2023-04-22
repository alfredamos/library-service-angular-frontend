import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { DeleteDepartmentComponent } from './delete-department/delete-department.component';
import { DetailDepartmentComponent } from './detail-department/detail-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { DepartmentFormComponent } from './form/department-form/department-form.component';
import { SingleDepartmentComponent } from './single-department/single-department.component';

@NgModule({
  declarations: [
    AddDepartmentComponent,
    DeleteDepartmentComponent,
    DetailDepartmentComponent,
    EditDepartmentComponent,
    ListDepartmentComponent,
    DepartmentFormComponent,
    SingleDepartmentComponent
  ],
  imports: [
    SharedModule
  ]
})
export class DepartmentsModule { }
