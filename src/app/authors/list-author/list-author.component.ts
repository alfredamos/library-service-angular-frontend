import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../../services/author.service';
import { Observable } from 'rxjs';
import { AuthorDto } from 'src/models/authors/author.model';

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.css'],
})
export class ListAuthorComponent {
  authors$ = this.authorService.authors$;

  constructor(private authorService: AuthorService) {}

}
