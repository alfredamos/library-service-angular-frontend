import { NgModule } from '@angular/core';
import { AddBookComponent } from './add-book/add-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ListBookComponent } from './list-book/list-book.component';
import { DetailBookComponent } from './detail-book/detail-book.component';
import { BookFormComponent } from './form/book-form/book-form.component';
import { SharedModule } from '../shared/shared.module';
import { SingleBookComponent } from './single-book/single-book.component';

@NgModule({
  declarations: [
    AddBookComponent,
    DeleteBookComponent,
    EditBookComponent,
    ListBookComponent,
    DetailBookComponent,
    BookFormComponent,
    SingleBookComponent,
  ],
  imports: [SharedModule],
})
export class BooksModule {}
