import { DataService } from "./data.service";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserDto } from "src/models/users/user.model";
import { BehaviorSubject, Observable, take, tap } from "rxjs";
import { usersUrl } from "src/utils/user.routes";

@Injectable({
  providedIn: 'root',
})
export class UserService extends DataService<UserDto> {
  private usersSubject = new BehaviorSubject<UserDto[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.loadUsers();
  }

  loadUsers() {
    this.findAll(usersUrl)
      .pipe(
        tap((users) => {
          this.updateUsers$(users);
        }),
        take(1)
      )
      .subscribe();
  }

  getUsers(): UserDto[] {
    return this.usersSubject.getValue();
  }

  updateUsers$(value: UserDto[]) {
    this.usersSubject.next(value);
  }

  addUser(user: UserDto): Observable<UserDto> {
    return this.create(usersUrl, user).pipe(
      tap((user) => {
        const users = this.usersSubject.getValue();
        const newUsers = [...users, user];
        this.updateUsers$(newUsers);
      })
    );
  }

  updateUser(id: string, user: UserDto): Observable<UserDto> {
    return this.update(`${usersUrl}/${id}`, user).pipe(
      tap((editedUser) => {
        const users = this.usersSubject.getValue();
        const editedUsers = users.map((user) =>
          user.id === editedUser.id ? editedUser : user
        );
        this.updateUsers$(editedUsers);
      })
    );
  }

  deleteUser(id: string): Observable<UserDto> {
    return this.remove(`${usersUrl}/${id}`).pipe(
      tap((deletedUser) => {
        const users = this.usersSubject.getValue();
        const filteredUsers = users.filter(
          (user) => user.id !== deletedUser.id
        );
        this.updateUsers$(filteredUsers);
      })
    );
  }
}
