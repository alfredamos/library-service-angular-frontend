import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthorDto } from 'src/models/authors/author.model';

@Component({
  selector: 'app-single-author',
  templateUrl: './single-author.component.html',
  styleUrls: ['./single-author.component.css'],
})
export class SingleAuthorComponent {
  @Input() author: AuthorDto;
  @Input() isDelete = false;
  @Output() onBackToList = new EventEmitter<void>();
  @Output() onDeleteClick = new EventEmitter<void>();
  @Output() onEditClick = new EventEmitter<string>();

  constructor() {
    this.author = new AuthorDto();
  }

  editClick(id: string) {
    this.onEditClick.emit(id);
  }

  deleteClick() {
    this.onDeleteClick.emit();
  }

  backToList() {
    this.onBackToList.emit();
  }
}
