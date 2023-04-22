import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, tap, take } from 'rxjs';
import { BookDto } from 'src/models/books/book.model';
import { BookService } from 'src/services/book.service';
import { booksUrl } from 'src/utils/book.routes';
import { AuthorService } from '../../../services/author.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  authors$ = this.authorService.authors$;
  categories$ = this.categoryService.bookCats$;

  bookForm!: FormGroup;
  formName = 'Edit';
  id = '';

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
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

  ngOnInit(): void {
    combineLatest([this.bookService.books$, this.route.paramMap])
      .pipe(
        map(([books, paraMap]) => {
          this.id = paraMap.get('id')!;
          return books.find((book) => book.id === this.id);
        }),
        tap((book) => {
          console.log("in book-edit, book : ", book);
          this.bookForm.patchValue({
            isbn: book?.isbn,
            title: book?.title,
            publisher: book?.publisher,
            edition: book?.edition,
            volume: book?.volume,
            bookCatId: book?.bookCatId,
            quantity: book?.quantity,
            authorId: book?.authorId,
            dateOfPublication: book?.dateOfPublication,
          });
        }),
        take(1)
      )
      .subscribe();
  }

  bookSubmit(bookDto: BookDto): void {
    bookDto.id = this.id;

    this.bookService
      .updateBook(this.id, bookDto)
      .subscribe((book) => this.router.navigate(['/books']));
  }

  backToList(): void {
    this.router.navigate(['/books']);
  }
}
