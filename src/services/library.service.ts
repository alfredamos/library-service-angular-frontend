import { LibraryDto } from "src/models/libraries/library.model";
import { DataService } from "./data.service";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, take, tap } from "rxjs";
import { librariesUrl } from "src/utils/library.routes";

@Injectable({
  providedIn: 'root',
})
export class LibraryService extends DataService<LibraryDto> {
  private librariesSubject = new BehaviorSubject<LibraryDto[]>([]);
  libraries$ = this.librariesSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.loadLibraries();
  }

  loadLibraries() {
    this.findAll(librariesUrl)
      .pipe(
        tap((libraries) => {
          this.updateLibraries$(libraries);
        }),
        take(1)
      )
      .subscribe();
  }

  getLibraries(): LibraryDto[] {
    return this.librariesSubject.getValue();
  }

  updateLibraries$(value: LibraryDto[]) {
    this.librariesSubject.next(value);
  }

  addLibrary(library: LibraryDto): Observable<LibraryDto> {
    return this.create(librariesUrl, library).pipe(
      tap((library) => {
        const libraries = this.librariesSubject.getValue();
        const newLibraries = [...libraries, library];
        this.updateLibraries$(newLibraries);
      })
    );
  }

  updateLibrary(id: string, library: LibraryDto): Observable<LibraryDto> {
    return this.update(`${librariesUrl}/${id}`, library).pipe(
      tap((editedLibrary) => {
        const libraries = this.librariesSubject.getValue();
        const editedLibraries = libraries.map((library) =>
          library.id === editedLibrary.id ? editedLibrary : library
        );
        this.updateLibraries$(editedLibraries);
      })
    );
  }

  deleteLibrary(id: string): Observable<LibraryDto> {
    return this.remove(`${librariesUrl}/${id}`).pipe(
      tap((deletedLibrary) => {
        const libraries = this.librariesSubject.getValue();
        const filteredLibraries = libraries.filter(
          (library) => library.id !== deletedLibrary.id
        );
        this.updateLibraries$(filteredLibraries);
      })
    );
  }
}
