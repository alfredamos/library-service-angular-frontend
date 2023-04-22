import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take, tap } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css'],
})
export class DeleteItemComponent implements OnInit {
  @Input() deleteMessage = '';
  @Input() deleteTitle = '';
  @Input() submitButton = '';
  @Input() cancelButton = '';
  @Output() onDeleteSubmit = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  deleteItem(value: boolean) {
    this.onDeleteSubmit.emit(value);
  }
}
