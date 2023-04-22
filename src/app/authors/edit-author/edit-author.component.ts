import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, take, combineLatest, map } from 'rxjs';
import { AuthorDto } from 'src/models/authors/author.model';
import { AuthorService } from 'src/services/author.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css'],
})
export class EditAuthorComponent implements OnInit {
  authorForm: FormGroup;
  formName = "Edit";
  id = "";

  constructor(private authorService: AuthorService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder
  ) {
    this.authorForm = fb.group({
      name: [""]
    })
  }

  ngOnInit(): void {
    combineLatest([this.authorService.authors$,
                   this.route.paramMap])
      .pipe(
        map(([authors, paraMap]) => {
          this.id = paraMap.get('id')!;
          return authors.find(author =>author.id === this.id)
        }),
        tap(author => {
          this.authorForm.patchValue({
            name: author?.name
          })
        }),
        take(1)
      )
      .subscribe();
  }

  authorSubmit(authorDto: AuthorDto): void {
    authorDto.id = this.id;

    this.authorService.updateAuthor(this.id, authorDto)
      .pipe(take(1)).subscribe((author) => this.router.navigate(['/authors']));
  }

  backToList(): void {
    this.router.navigate(['/authors']);
  }
}
