import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, tap, take } from 'rxjs';
import { BookCatDto } from 'src/models/categories/book-category.model';
import { CategoryService } from 'src/services/category.service';
import { bookCatsUrl } from 'src/utils/book-category.route';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent {
  bookCatForm: FormGroup;
  formName = 'Edit';
  bookCats: BookCatDto[] = [];
  id = '';

  constructor(
    private bookCatService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.bookCatForm = fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    combineLatest([this.bookCatService.bookCats$, this.route.paramMap])
      .pipe(
        map(([bookCats, paraMap]) => {
          this.id = paraMap.get('id')!;
          this.bookCats = bookCats;
          return bookCats.find((bookCat) => bookCat.id === this.id);
        }),
        tap((bookCat) => {
          this.bookCatForm.patchValue({
            name: bookCat?.name,
          });
        }),
        take(1)
      )
      .subscribe();
  }

  bookCatSubmit(bookCatDto: BookCatDto): void {
    bookCatDto.id = this.id;

    this.bookCatService
      .update(`${bookCatsUrl}/${this.id}`, bookCatDto)
      .pipe(
        tap((editedBookCat) => {
          const allBookCats = this.bookCats.map((bookCat) =>
            bookCat.id === editedBookCat?.id ? editedBookCat : bookCat
          );
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
