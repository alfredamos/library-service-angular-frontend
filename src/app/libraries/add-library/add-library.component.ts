import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, take } from 'rxjs';
import { LibraryDto } from 'src/models/libraries/library.model';
import { LibraryService } from 'src/services/library.service';
import { librariesUrl } from 'src/utils/library.routes';
import { BookService } from '../../../services/book.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-library',
  templateUrl: './add-library.component.html',
  styleUrls: ['./add-library.component.css'],
})
export class AddLibraryComponent implements OnInit{
  books$ = this.bookService.books$;
  users$ = this.userService.users$;
  libraries: LibraryDto[] = [];
  libraryForm: FormGroup;
  formName = 'Create';

  constructor(
    private bookService: BookService,
    private libraryService: LibraryService,
    private userService: UserService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.libraryForm = fb.group({
      bookId: [''],
      userId: [''],
      requesterCategory: ['']
    });
  }

  ngOnInit(): void {
    this.libraryService.libraries$
      .pipe(
        tap((libraries) => (this.libraries = libraries)),
        take(1)
      )
      .subscribe();
  }

  librarySubmit(libraryDto: LibraryDto): void {
    this.libraryService
      .create(librariesUrl, libraryDto)
      .pipe(
        tap((newLibrary) => {
          const allLibraries = [...this.libraries, newLibrary];
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
