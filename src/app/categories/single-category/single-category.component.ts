import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookCatDto } from 'src/models/categories/book-category.model';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent {
  @Input() category: BookCatDto;
  @Input() isDelete = false;
  @Output() onBackToList = new EventEmitter<void>();
  @Output() onDeleteClick = new EventEmitter<void>();
  @Output() onEditClick = new EventEmitter<string>();

  constructor() {
    this.category = new BookCatDto();
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
