import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserListDto } from 'src/models/users/user-list.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent {
  users$: Observable<UserListDto[]> = this.userService.users$;

  constructor(private userService: UserService) {}

}
