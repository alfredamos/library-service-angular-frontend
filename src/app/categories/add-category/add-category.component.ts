import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, take } from 'rxjs';
import { BookCatDto } from 'src/models/categories/book-category.model';
import { CategoryService } from 'src/services/category.service';
import { bookCatsUrl } from 'src/utils/book-category.route';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit{
  bookCats: BookCatDto[] = [];
  bookCatForm: FormGroup;
  formName = 'Create';

  constructor(
    private bookCatService: CategoryService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.bookCatForm = fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.bookCatService.bookCats$
      .pipe(
        tap((bookCats) => (this.bookCats = bookCats)),
        take(1)
      )
      .subscribe();
  }

  bookCatSubmit(bookCatDto: BookCatDto): void {
    this.bookCatService
      .create(bookCatsUrl, bookCatDto)
      .pipe(
        tap((newBookCat) => {
          const allBookCats = [...this.bookCats, newBookCat];
          this.bookCatService.updateBookCats$(allBookCats);
        }),
        take(1)
      )
      .subscribe((bookCat) => this.router.navigate(['/categories']));
  }

  backToList(): void {
    this.router.navigate(['/categories']);
  }
}
