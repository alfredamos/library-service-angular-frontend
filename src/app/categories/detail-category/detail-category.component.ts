import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css'],
})
export class DetailCategoryComponent {
  bookCat$ = combineLatest([
    this.bookCatService.bookCats$,
    this.route.paramMap,
  ]).pipe(
    map(([bookCats, paraMap]) => {
      const id = paraMap.get('id');
      return bookCats.find((bookCat) => bookCat.id === id);
    })
  );

  constructor(
    private bookCatService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  editClick(id: string) {
    this.router.navigate([`/edit-category/${id}`]);
  }

  backToList() {
    this.router.navigate(['/categories']);
  }
}
