import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, take } from 'rxjs';
import { BookDto } from 'src/models/books/book.model';
import { AuthorService } from 'src/services/author.service';
import { BookService } from 'src/services/book.service';
import { booksUrl } from 'src/utils/book.routes';
import { AuthorDto } from '../../../models/authors/author.model';
import { BookCatDto } from '../../../models/categories/book-category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent{
  authors$ = this.authorService.authors$;
  categories$ = this.categoryService.bookCats$;

  books: BookDto[] = [];
  bookForm: FormGroup;
  formName = 'Create';

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private categoryService: CategoryService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.bookForm = fb.group({
      isbn: [''],
      title: [''],
      publisher: [''],
      edition: [''],
      volume: [''],
      bookCatId: [''],
      quantity: [''],
      authorId: [''],
      dateOfPublication: [''],
    });
  }

  bookSubmit(bookDto: BookDto): void {
    this.bookService
      .addBook(bookDto)
      .subscribe((book) => this.router.navigate(['/books']));
  }

  backToList(): void {
    this.router.navigate(['/books']);
  }
}
