import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ListAuthorComponent } from './list-author/list-author.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { DeleteAuthorComponent } from './delete-author/delete-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { DetailAuthorComponent } from './detail-author/detail-author.component';
import { AuthorFormComponent } from './form/author-form/author-form.component';
import { SingleAuthorComponent } from './single-author/single-author.component';



@NgModule({
  declarations: [
    ListAuthorComponent,
    AddAuthorComponent,
    DeleteAuthorComponent,
    EditAuthorComponent,
    DetailAuthorComponent,
    AuthorFormComponent,
    SingleAuthorComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AuthorsModule { }
