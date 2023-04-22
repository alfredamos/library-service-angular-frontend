import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookCatDto } from 'src/models/categories/book-category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent {
  @Input()bookCatForm: FormGroup;
  @Input() formName = "";
  @Output() onBookCatSubmit = new EventEmitter<BookCatDto>();
  @Output() onBackToList = new EventEmitter<void>();

  constructor(fb: FormBuilder) {
    this.bookCatForm = fb.group({
      name: ['', Validators.required],
    });
  }

 bookCatSubmit() {
    this.onBookCatSubmit.emit(this.bookCatForm.value);
  }

  backToList() {
    this.onBackToList.emit();
  }
}
