import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryListDto } from 'src/models/libraries/library-list.model';
import { LibraryService } from 'src/services/library.service';

@Component({
  selector: 'app-list-library',
  templateUrl: './list-library.component.html',
  styleUrls: ['./list-library.component.css'],
})
export class ListLibraryComponent {
  libraries$: Observable<LibraryListDto[]> = this.libraryService.libraries$;

  constructor(private libraryService: LibraryService) {}

}
