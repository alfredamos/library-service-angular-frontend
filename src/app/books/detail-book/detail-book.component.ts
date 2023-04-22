import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { BookService } from 'src/services/book.service';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css'],
})
export class DetailBookComponent {
  book$ = combineLatest([this.bookService.books$, this.route.paramMap]).pipe(
    map(([books, paraMap]) => {
      const id = paraMap.get('id');
      return books.find((book) => book.id === id);
    })
  );

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  editClick(id: string) {
    this.router.navigate([`/edit-book/${id}`]);
  }

  backToList() {
    this.router.navigate(['/books']);
  }
}
