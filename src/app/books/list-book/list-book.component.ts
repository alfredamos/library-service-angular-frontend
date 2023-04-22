import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from 'src/services/book.service';
import { BookListDto } from 'src/models/books/book-list.model';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css'],
})
export class ListBookComponent{
  books$: Observable<BookListDto[]> = this.bookService.books$;

  constructor(private bookService: BookService) {}

}
