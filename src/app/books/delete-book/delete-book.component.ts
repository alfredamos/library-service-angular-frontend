import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, take, tap } from 'rxjs';
import { BookDto } from 'src/models/books/book.model';
import { BookService } from 'src/services/book.service';
import { booksUrl } from 'src/utils/book.routes';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent {
  book = new BookDto();
  deleteTitle = '';
  deleteMessage = '';
  showDeleteItem = false;
  id = '';

  book$ = combineLatest([
    this.bookService.books$,
    this.route.paramMap,
  ]).pipe(
    map(([books, paraMap]) => {
      this.id = paraMap.get('id')!;
      this.book = books.find((book) => book.id === this.id)!;
      return this.book;
    })
  );

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteClick() {
    this.deleteMessage = `Do you really want to delete book : ${this.book.title}`;
    this.deleteTitle = 'book Delete Confirmation';
    this.showDeleteItem = !this.showDeleteItem;
  }

  deleteBook(value: boolean) {
    if (value) {
      this.bookService
        .deleteBook(this.id)
        .subscribe((deleteBook) => this.router.navigate(['/books']));
    } else {
      this.router.navigate(['/books']);
    }
  }

  editClick(id: string) {
    this.router.navigate([`/edit-book/${id}`]);
  }

  backToList() {
    this.router.navigate(['/books']);
  }
}
