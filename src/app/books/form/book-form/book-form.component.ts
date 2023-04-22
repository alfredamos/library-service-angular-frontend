import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorDto } from 'src/models/authors/author.model';
import { BookDto } from 'src/models/books/book.model';
import { BookCatDto } from 'src/models/categories/book-category.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent {
  @Input() authors: AuthorDto[] | null = [];
  @Input() categories: BookCatDto[] | null= [];
  @Input() bookForm: FormGroup;
  @Input() formName = '';
  @Output() onBookSubmit = new EventEmitter<BookDto>();
  @Output() onBackToList = new EventEmitter<void>();

  constructor(fb: FormBuilder) {
    this.bookForm = fb.group({
      isbn: ['',Validators.required],
      title: ['', Validators.required],
      publisher: ['', Validators.required],
      edition: ['', Validators.required],
      volume: ['', Validators.required],
      bookCatId: ['', Validators.required],
      quantity: ['', Validators.required],
      authorId: ['', Validators.required],
      dateOfPublication: ['', Validators.required],
    });
  }

  bookSubmit() {
    this.onBookSubmit.emit(this.bookForm.value);
  }

  backToList() {
    this.onBackToList.emit();
  }
}
