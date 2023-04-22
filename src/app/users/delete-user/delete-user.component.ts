import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, take, tap } from 'rxjs';
import { UserDto } from 'src/models/users/user.model';
import { UserService } from 'src/services/user.service';
import { usersUrl } from 'src/utils/user.routes';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent {
  user = new UserDto();
  users: UserDto[] = [];
  deleteTitle = '';
  deleteMessage = '';
  showDeleteItem = false;
  id = '';

  user$ = combineLatest([this.userService.users$, this.route.paramMap]).pipe(
    map(([users, paraMap]) => {
      this.id = paraMap.get('id')!;
      this.users = users;
      this.user = users.find((user) => user.id === this.id)!;
      return this.user;
    })
  );

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteClick() {
    this.deleteMessage = `Do you really want to delete user : ${this.user.name}`;
    this.deleteTitle = 'User Delete Confirmation';
    this.showDeleteItem = !this.showDeleteItem;
  }

  deleteUser(value: boolean) {
    if (value) {
      this.userService
        .remove(`${usersUrl}/${this.id}`)
        .pipe(
          tap(deletedUser => {
            const currentUsers = this.users.filter(user => user.id !== deletedUser.id);
            this.userService.updateUsers$(currentUsers);
          }),
          take(1)
          )
        .subscribe((deleteUser) => this.router.navigate(['/users']));
    } else {
      this.router.navigate(['/users']);
    }
  }

  backToList() {
    this.router.navigate(['/users']);
  }
}
