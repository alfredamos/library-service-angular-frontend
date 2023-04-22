import { Component } from '@angular/core';
import { AuthorService } from '../../../services/author.service';
import { Router } from '@angular/router';
import { AuthorDto } from '../../../models/authors/author.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css'],
})
export class AddAuthorComponent {
  authorForm: FormGroup;
  formName = 'Create';

  constructor(
    private authorService: AuthorService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.authorForm = fb.group({
      name: [''],
    });
  }

  authorSubmit(authorDto: AuthorDto): void {
      this.authorService
        .addAuthor(authorDto)
        .pipe(take(1))
        .subscribe((author) => this.router.navigate(['/authors']));

  }

  backToList(): void {
    this.router.navigate(['/authors']);
  }
}
