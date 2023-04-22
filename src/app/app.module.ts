import { AuthorsModule } from './authors/authors.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from '../interceptors/jwt-interceptor.interceptor';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { DepartmentsModule } from './departments/departments.module';
import { LibrariesModule } from './libraries/libraries.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    AuthorsModule,
    BooksModule,
    CategoriesModule,
    DepartmentsModule,
    LibrariesModule,
    UsersModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
