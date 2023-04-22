import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AuthorDto } from 'src/models/authors/author.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { authorsUrl } from 'src/utils/author.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends DataService<AuthorDto> {
  private authorsSubject = new BehaviorSubject<AuthorDto[]>([]);
  authors$ = this.authorsSubject.asObservable();

  constructor(http: HttpClient){
    super(http);
    this.loadAuthors();
  }

  private loadAuthors(){
    this.findAll(authorsUrl).pipe(
      tap(authors => {
        this.updateAuthors$(authors);
      }),
      take(1)
    ).subscribe()
  }

  getAuthors(): AuthorDto[]{
    return this.authorsSubject.getValue();
  }

  updateAuthors$(value: AuthorDto[]){
    this.authorsSubject.next(value);
  }

  addAuthor(author: AuthorDto): Observable<AuthorDto>{
    return this.create(authorsUrl, author).pipe(
      tap(author => {
        const authors = this.authorsSubject.getValue();
        const newAuthors = [...authors, author];
        this.updateAuthors$(newAuthors);
      })
    )
  }

  updateAuthor(id: string, author: AuthorDto): Observable<AuthorDto>{
    return this.update(`${authorsUrl}/${id}`, author).pipe(
      tap((editedAuthor) => {
        const authors = this.authorsSubject.getValue();
        const editedAuthors = authors.map(author => author.id === editedAuthor.id ? editedAuthor : author);
        this.updateAuthors$(editedAuthors);
      })
    );
  }

  deleteAuthor(id: string): Observable<AuthorDto>{
    return this.remove(`${authorsUrl}/${id}`).pipe(
      tap((deletedAuthor) => {
        const authors = this.authorsSubject.getValue();
        const filteredAuthors = authors.filter(author => author.id !== deletedAuthor.id);
        this.updateAuthors$(filteredAuthors);
      })
    );
  }
}
