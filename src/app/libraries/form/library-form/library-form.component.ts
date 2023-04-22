import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LibraryDto } from 'src/models/libraries/library.model';
import { BookDto } from '../../../../models/books/book.model';
import { UserDto } from '../../../../models/users/user.model';

@Component({
  selector: 'app-library-form',
  templateUrl: './library-form.component.html',
  styleUrls: ['./library-form.component.css'],
})
export class LibraryFormComponent {
  @Input() libraryForm: FormGroup;
  @Input() books: BookDto[] | null = [];
  @Input() users: UserDto[] | null = [];
  @Input() formName = '';
  @Output() onLibrarySubmit = new EventEmitter<LibraryDto>();
  @Output() onBackToList = new EventEmitter<void>();

  constructor(fb: FormBuilder) {
    this.libraryForm = fb.group({
      bookId: ['', Validators.required],
      userId: ['', Validators.required],
      requesterCategory: ['', Validators.required],
    });
  }

  librarySubmit() {
    this.onLibrarySubmit.emit(this.libraryForm.value);
  }

  backToList() {
    this.onBackToList.emit();
  }
}
