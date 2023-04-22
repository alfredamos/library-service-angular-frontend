import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BookCatDto } from 'src/models/categories/book-category.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { bookCatsUrl } from 'src/utils/book-category.route';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends DataService<BookCatDto> {
  private bookCatsSubject = new BehaviorSubject<BookCatDto[]>([]);
  bookCats$ = this.bookCatsSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.loadBookCats();
  }

  loadBookCats() {
    this.findAll(bookCatsUrl)
      .pipe(
        tap((bookCats) => {
          this.updateBookCats$(bookCats);
        }),
        take(1)
      )
      .subscribe();
  }

  getBookCats(): BookCatDto[] {
    return this.bookCatsSubject.getValue();
  }

  updateBookCats$(value: BookCatDto[]) {
    this.bookCatsSubject.next(value);
  }

  addBookCat(bookCat: BookCatDto): Observable<BookCatDto> {
    return this.create(bookCatsUrl, bookCat).pipe(
      tap((bookCat) => {
        const bookCats = this.bookCatsSubject.getValue();
        const newBookCats = [...bookCats, bookCat];
        this.updateBookCats$(newBookCats);
      })
    );
  }

  updateBookCat(id: string, bookCat: BookCatDto): Observable<BookCatDto> {
    return this.update(`${bookCatsUrl}/${id}`, bookCat).pipe(
      tap((editedBookCat) => {
        const bookCats = this.bookCatsSubject.getValue();
        const editedBookCats = bookCats.map((bookCat) =>
          bookCat.id === editedBookCat.id ? editedBookCat : bookCat
        );
        this.updateBookCats$(editedBookCats);
      })
    );
  }

  deleteBookCat(id: string): Observable<BookCatDto> {
    return this.remove(`${bookCatsUrl}/${id}`).pipe(
      tap((deletedBookCat) => {
        const bookCats = this.bookCatsSubject.getValue();
        const filteredBookCats = bookCats.filter(
          (bookCat) => bookCat.id !== deletedBookCat.id
        );
        this.updateBookCats$(filteredBookCats);
      })
    );
  }
}
