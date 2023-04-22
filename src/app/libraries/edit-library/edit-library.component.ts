import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, take } from 'rxjs';
import { combineLatest, map } from 'rxjs';
import { LibraryListDto } from 'src/models/libraries/library-list.model';
import { LibraryDto } from 'src/models/libraries/library.model';
import { BookService } from 'src/services/book.service';
import { LibraryService } from 'src/services/library.service';
import { UserService } from 'src/services/user.service';
import { librariesUrl } from 'src/utils/library.routes';

@Component({
  selector: 'app-edit-library',
  templateUrl: './edit-library.component.html',
  styleUrls: ['./edit-library.component.css'],
})
export class EditLibraryComponent implements OnInit {
  books$ = this.bookService.books$;
  users$ = this.userService.users$;

  id = '';
  libraries: LibraryDto[] = [];
  libraryForm: FormGroup;
  formName = 'Edit';

  constructor(
    private bookService: BookService,
    private libraryService: LibraryService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.libraryForm = fb.group({
      bookId: [''],
      userId: [''],
      requesterCategory: [''],
    });
  }

  ngOnInit(): void {    
    combineLatest([this.libraryService.libraries$, this.route.paramMap])
      .pipe(
        map(([libraries, paraMap]) => {
          this.id = paraMap.get('id')!;
          this.libraries = libraries;
          return libraries.find((library) => library.id === this.id);
        }),
        map(lib => lib as LibraryListDto),
        tap((library) => {
          console.log("library-edit, library : ", library);
          
          this.libraryForm.patchValue({
            bookId: library?.book?.id,
            userId: library?.user?.id,
            requesterCategory: library?.requesterCategory,
          });
        }),
        take(1)
      )
      .subscribe();
  }

  librarySubmit(libraryDto: LibraryDto): void {
    libraryDto.id = this.id;

    this.libraryService
      .update(`${librariesUrl}/${this.id}`, libraryDto)
      .pipe(
        tap((editedLibrary) => {
          const allLibraries = this.libraries.map((library) =>
            library.id === editedLibrary.id ? editedLibrary : library
          );
          this.libraryService.updateLibraries$(allLibraries);
        }),
        take(1)
      )
      .subscribe((library) => this.router.navigate(['/']));
  }

  backToList(): void {
    this.router.navigate(['/']);
  }
}
