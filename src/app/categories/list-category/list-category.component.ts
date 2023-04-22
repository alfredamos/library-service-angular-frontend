import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookCatDto } from 'src/models/categories/book-category.model';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent {
  bookCats$ = this.bookCatService.bookCats$;

  constructor(private bookCatService: CategoryService) {}

}
