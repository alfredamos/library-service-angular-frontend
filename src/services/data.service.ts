import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService<T> {
  constructor(public http: HttpClient) {}

  create(url: string, resource: T): Observable<T> {
    return this.http.post<T>(url, resource);
  }

  findAll(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }
  findOne(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  remove(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
  update(url: string, resource: T): Observable<T> {
    return this.http.patch<T>(url, resource);
  }
}
