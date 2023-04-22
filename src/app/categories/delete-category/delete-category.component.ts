import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, combineLatest, take, tap } from 'rxjs';
import { BookCatDto } from 'src/models/categories/book-category.model';
import { CategoryService } from 'src/services/category.service';
import { bookCatsUrl } from 'src/utils/book-category.route';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  bookCat = new BookCatDto();
  categories: BookCatDto[] = [];
  deleteTitle = '';
  deleteMessage = '';
  showDeleteItem = false;
  id = '';

  bookCat$ = combineLatest([
    this.bookCatService.bookCats$,
    this.route.paramMap,
  ]).pipe(
    map(([bookCats, paraMap]) => {
      this.id = paraMap.get('id')!;
      this.categories = bookCats;
      this.bookCat = bookCats.find((bookCat) => bookCat.id === this.id)!;
      return this.bookCat;
    })
  );

  constructor(
    private bookCatService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteClick() {
    this.deleteMessage = `Do you really want to delete bookCat : ${this.bookCat.name}`;
    this.deleteTitle = 'BookCat Delete Confirmation';
    this.showDeleteItem = !this.showDeleteItem;
  }

  deleteBookCat(value: boolean) {
    if (value) {
      this.bookCatService
        .remove(`${bookCatsUrl}/${this.id}`)
        .pipe(
          tap(deletedBookCat => {
            const currentBookCats = this.categories.filter(cat => cat.id !== deletedBookCat.id);
            this.bookCatService.updateBookCats$(currentBookCats);
          }),
          take(1))
        .subscribe((deleteBookCat) => this.router.navigate(['/categories']));
    } else {
      this.router.navigate(['/categories']);
    }
  }

  editClick(id: string) {
    this.router.navigate([`/edit-category/${id}`]);
  }

  backToList() {
    this.router.navigate(['/categories']);
  }
}
