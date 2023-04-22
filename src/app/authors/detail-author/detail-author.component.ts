import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { AuthorService } from 'src/services/author.service';

@Component({
  selector: 'app-detail-author',
  templateUrl: './detail-author.component.html',
  styleUrls: ['./detail-author.component.css'],
})
export class DetailAuthorComponent {
  author$ = combineLatest([
    this.authorService.authors$,
    this.route.paramMap,
  ]).pipe(
    map(([authors, paraMap]) => {
      const id = paraMap.get('id');
      return authors.find((author) => author.id === id);
    })
  );

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  editClick(id: string){
    this.router.navigate([`/edit-author/${id}`]);
  }

  backToList() {
    this.router.navigate(['/authors']);
  }
}
