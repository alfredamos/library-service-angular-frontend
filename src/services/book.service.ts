import { BookDto } from "src/models/books/book.model";
import { DataService } from "./data.service";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, take, tap } from "rxjs";
import { booksUrl } from "src/utils/book.routes";

@Injectable({
  providedIn: 'root',
})
export class BookService extends DataService<BookDto> {
  private booksSubject = new BehaviorSubject<BookDto[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.loadBooks();
  }

  loadBooks() {
    this.findAll(booksUrl)
      .pipe(
        tap((books) => {
          this.updateBooks$(books);
        }),
        take(1)
      )
      .subscribe();
  }

  getBooks(): BookDto[] {
    return this.booksSubject.getValue();
  }

  updateBooks$(value: BookDto[]) {
    this.booksSubject.next(value);
  }

  addBook(book: BookDto): Observable<BookDto> {
    return this.create(booksUrl, book).pipe(
      tap((book) => {
        const books = this.booksSubject.getValue();
        const newBooks = [...books, book];
        this.updateBooks$(newBooks);
      })
    );
  }

  updateBook(id: string, book: BookDto): Observable<BookDto> {
    return this.update(`${booksUrl}/${id}`, book).pipe(
      tap((editedBook) => {
        const books = this.booksSubject.getValue();
        const editedBooks = books.map((book) =>
          book.id === editedBook.id ? editedBook : book
        );
        this.updateBooks$(editedBooks);
      })
    );
  }

  deleteBook(id: string): Observable<BookDto> {
    return this.remove(`${booksUrl}/${id}`).pipe(
      tap((deletedBook) => {
        const books = this.booksSubject.getValue();
        const filteredBooks = books.filter(
          (book) => book.id !== deletedBook.id
        );
        this.updateBooks$(filteredBooks);
      })
    );
  }
}
