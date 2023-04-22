import { authorsUrl } from "src/utils/author.routes";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, take, tap } from 'rxjs';
import { AuthorDto } from 'src/models/authors/author.model';
import { AuthorService } from 'src/services/author.service';

@Component({
  selector: 'app-delete-author',
  templateUrl: './delete-author.component.html',
  styleUrls: ['./delete-author.component.css'],
})
export class DeleteAuthorComponent {
  author = new AuthorDto();
  deleteTitle = '';
  deleteMessage = '';
  showDeleteItem = false;
  id = '';

  author$ = combineLatest([
    this.authorService.authors$,
    this.route.paramMap,
  ]).pipe(
    map(([authors, paraMap]) => {
      this.id = paraMap.get('id')!;
      this.author = authors.find((author) => author.id === this.id)!;
      return this.author;
    })
  );

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteClick() {
    this.deleteMessage = `Do you really want to delete author : ${this.author.name}`;
    this.deleteTitle = 'Author Delete Confirmation';
    this.showDeleteItem = !this.showDeleteItem;
  }

  deleteAuthor(value: boolean) {
    if (value) {
      this.authorService
        .deleteAuthor(this.id)
        .subscribe((deleteAuthor) => this.router.navigate(['/authors']));
    } else {
      this.router.navigate(['/authors']);
    }
  }

  editClick(id: string) {
    this.router.navigate([`/edit-author/${id}`]);
  }

  backToList() {
    this.router.navigate(['/authors']);
  }
}
