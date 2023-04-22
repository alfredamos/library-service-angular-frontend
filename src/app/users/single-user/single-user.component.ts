import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserListDto } from 'src/models/users/user-list.model';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css'],
})
export class SingleUserComponent {
  @Input() user: UserListDto;
  @Input() isDelete = false;
  @Output() onBackToList = new EventEmitter<void>();
  @Output() onDeleteClick = new EventEmitter<void>();

  constructor() {
    this.user = new UserListDto();
  }

  deleteClick(){
    this.onDeleteClick.emit();
  }

  backToList(){
    this.onBackToList.emit();
  }
}
