import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { LibraryService } from '../../../services/library.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthorService } from '../../../services/author.service';

@Component({
  selector: 'app-detail-library',
  templateUrl: './detail-library.component.html',
  styleUrls: ['./detail-library.component.css'],
})
export class DetailLibraryComponent {
  library$ = combineLatest([
    this.libraryService.libraries$,
    this.route.paramMap,
  ]).pipe(
    map(([libraries, paraMap]) => {
      const id = paraMap.get('id');
      return libraries.find((library) => library.id === id);
    })
  );

  constructor(
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  editClick(id: string) {
    this.router.navigate([`/edit-library/${id}`]);
  }

  backToList() {
    this.router.navigate(['/']);
  }
}
