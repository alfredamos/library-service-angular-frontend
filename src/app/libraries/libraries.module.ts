import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddLibraryComponent } from './add-library/add-library.component';
import { DeleteLibraryComponent } from './delete-library/delete-library.component';
import { DetailLibraryComponent } from './detail-library/detail-library.component';
import { ListLibraryComponent } from './list-library/list-library.component';
import { EditLibraryComponent } from './edit-library/edit-library.component';
import { LibraryFormComponent } from './form/library-form/library-form.component';
import { SingleLibraryComponent } from './single-library/single-library.component';



@NgModule({
  declarations: [
    AddLibraryComponent,
    DeleteLibraryComponent,
    DetailLibraryComponent,
    ListLibraryComponent,
    EditLibraryComponent,
    LibraryFormComponent,
    SingleLibraryComponent
  ],
  imports: [
    SharedModule
  ]
})
export class LibrariesModule { }
