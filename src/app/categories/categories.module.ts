import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CategoryFormComponent } from './form/category-form/category-form.component';
import { SingleCategoryComponent } from './single-category/single-category.component';



@NgModule({
  declarations: [
    AddCategoryComponent,
    DeleteCategoryComponent,
    EditCategoryComponent,
    DetailCategoryComponent,
    ListCategoryComponent,
    CategoryFormComponent,
    SingleCategoryComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CategoriesModule { }
