import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookListDto } from 'src/models/books/book-list.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css'],
})
export class SingleBookComponent {
  @Input() book: BookListDto;
  @Input() isDelete = false;
  @Output() onBackToList = new EventEmitter<void>();
  @Output() onDeleteClick = new EventEmitter<void>();
  @Output() onEditClick = new EventEmitter<string>();


  constructor() {
    this.book = new BookListDto();
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
