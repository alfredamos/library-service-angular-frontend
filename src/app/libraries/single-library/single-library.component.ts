import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LibraryListDto } from 'src/models/libraries/library-list.model';

@Component({
  selector: 'app-single-library',
  templateUrl: './single-library.component.html',
  styleUrls: ['./single-library.component.css'],
})
export class SingleLibraryComponent {
  @Input() library: LibraryListDto;
  @Input() isDelete = false;
  @Output() onBackToList = new EventEmitter<void>();
  @Output() onDeleteClick = new EventEmitter<void>();
  @Output() onEditClick = new EventEmitter<string>();

  constructor() {
    this.library = new LibraryListDto();
  }

  backToList() {
    this.onBackToList.emit();
  }

  editClick(id: string) {
    this.onEditClick.emit(id);
  }

  deleteClick() {
    this.onDeleteClick.emit();
  }
}
