import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, take, tap } from 'rxjs';
import { LibraryListDto } from 'src/models/libraries/library-list.model';
import { LibraryService } from 'src/services/library.service';
import { librariesUrl } from 'src/utils/library.routes';
import { LibraryDto } from '../../../models/libraries/library.model';

@Component({
  selector: 'app-delete-library',
  templateUrl: './delete-library.component.html',
  styleUrls: ['./delete-library.component.css'],
})
export class DeleteLibraryComponent {
  library = new LibraryListDto();
  libraries: LibraryDto[] = [];
  deleteTitle = '';
  deleteMessage = '';
  showDeleteItem = false;
  id = '';

  library$ = combineLatest([
    this.libraryService.libraries$,
    this.route.paramMap,
  ]).pipe(
    map(([libraries, paraMap]) => {
      this.id = paraMap.get('id')!;
      this.libraries = libraries;
      this.library = libraries.find((library) => library.id === this.id)!;
      return this.library;
    })
  );

  constructor(
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteClick() {
    this.deleteMessage = `Do you really want to delete library  request by: ${this.library.user?.name}`;
    this.deleteTitle = 'Library Delete Confirmation';
    this.showDeleteItem = !this.showDeleteItem;
  }

  deleteLibrary(value: boolean) {
    if (value) {
      this.libraryService
        .remove(`${librariesUrl}/${this.id}`)
        .pipe(
          tap(deletedLibrary => {
            const currentLibraries = this.libraries.filter(library => library.id !== deletedLibrary.id);
            this.libraryService.updateLibraries$(currentLibraries);
          }),
          take(1)
          )
        .subscribe((deleteLibrary) => this.router.navigate(['/']));
    } else {
      this.router.navigate(['/']);
    }
  }

  editClick(id: string) {
    this.router.navigate([`/edit-library/${id}`]);
  }

  backToList() {
    this.router.navigate(['/']);
  }
}
