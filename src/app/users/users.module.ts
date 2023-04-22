import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SingleUserComponent } from './single-user/single-user.component';



@NgModule({
  declarations: [
    DetailUserComponent,
    DeleteUserComponent,
    ListUserComponent,
    SingleUserComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UsersModule { }
