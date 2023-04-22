import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLibraryComponent } from './libraries/list-library/list-library.component';
import { AddLibraryComponent } from './libraries/add-library/add-library.component';
import { DeleteLibraryComponent } from './libraries/delete-library/delete-library.component';
import { DetailLibraryComponent } from './libraries/detail-library/detail-library.component';
import { EditLibraryComponent } from './libraries/edit-library/edit-library.component';
import { ListAuthorComponent } from './authors/list-author/list-author.component';
import { AddAuthorComponent } from './authors/add-author/add-author.component';
import { DeleteAuthorComponent } from './authors/delete-author/delete-author.component';
import { DetailAuthorComponent } from './authors/detail-author/detail-author.component';
import { EditAuthorComponent } from './authors/edit-author/edit-author.component';
import { ListCategoryComponent } from './categories/list-category/list-category.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { DeleteCategoryComponent } from './categories/delete-category/delete-category.component';
import { DetailCategoryComponent } from './categories/detail-category/detail-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { ListBookComponent } from './books/list-book/list-book.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { DeleteBookComponent } from './books/delete-book/delete-book.component';
import { DetailBookComponent } from './books/detail-book/detail-book.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { ListDepartmentComponent } from './departments/list-department/list-department.component';
import { AddDepartmentComponent } from './departments/add-department/add-department.component';
import { DeleteDepartmentComponent } from './departments/delete-department/delete-department.component';
import { DetailDepartmentComponent } from './departments/detail-department/detail-department.component';
import { EditDepartmentComponent } from './departments/edit-department/edit-department.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { DetailUserComponent } from './users/detail-user/detail-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { HomeComponent } from './auth/home/home.component';
import { MustLoginComponent } from './auth/must-login/must-login.component';
import { NotAllowedComponent } from './auth/not-allowed/not-allowed.component';
import { LoginRouteGuard } from './guards/login-route.guard';
import { AdminRouteGuard } from './guards/admin-route.guard';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: ListLibraryComponent , canActivate
: [LoginRouteGuard]},
  { path: 'add-library', component: AddLibraryComponent, canActivate: [LoginRouteGuard] },
  { path: 'delete-library/:id', component: DeleteLibraryComponent, canActivate: [AdminRouteGuard] },
  { path: 'detail-library/:id', component: DetailLibraryComponent, canActivate: [LoginRouteGuard] },
  { path: 'edit-library/:id', component: EditLibraryComponent, canActivate: [AdminRouteGuard] },

  { path: 'authors', component: ListAuthorComponent, canActivate: [LoginRouteGuard] },
  { path: 'add-author', component: AddAuthorComponent, canActivate: [AdminRouteGuard] },
  { path: 'delete-author/:id', component: DeleteAuthorComponent, canActivate: [AdminRouteGuard] },
  { path: 'detail-author/:id', component: DetailAuthorComponent, canActivate: [LoginRouteGuard] },
  { path: 'edit-author/:id', component: EditAuthorComponent, canActivate: [AdminRouteGuard] },

  { path: 'books', component: ListBookComponent, canActivate: [LoginRouteGuard] },
  { path: 'add-book', component: AddBookComponent, canActivate: [AdminRouteGuard] },
  { path: 'delete-book/:id', component: DeleteBookComponent, canActivate: [AdminRouteGuard] },
  { path: 'detail-book/:id', component: DetailBookComponent, canActivate:[LoginRouteGuard] },
  { path: 'edit-book/:id', component: EditBookComponent, canActivate: [AdminRouteGuard]},

  { path: 'categories', component: ListCategoryComponent, canActivate: [AdminRouteGuard] },
  { path: 'add-category', component: AddCategoryComponent, canActivate: [AdminRouteGuard] },
  { path: 'delete-category/:id', component: DeleteCategoryComponent, canActivate: [AdminRouteGuard] },
  { path: 'detail-category/:id', component: DetailCategoryComponent, canActivate: [AdminRouteGuard] },
  { path: 'edit-category/:id', component: EditCategoryComponent, canActivate: [AdminRouteGuard] },

  { path: 'departments', component: ListDepartmentComponent, canActivate: [LoginRouteGuard] },
  { path: 'add-department', component: AddDepartmentComponent, canActivate: [AdminRouteGuard] },
  { path: 'delete-department/:id', component: DeleteDepartmentComponent, canActivate: [AdminRouteGuard] },
  { path: 'detail-department/:id', component: DetailDepartmentComponent, canActivate: [LoginRouteGuard] },
  { path: 'edit-department/:id', component: EditDepartmentComponent, canActivate: [AdminRouteGuard] },

  { path: 'delete-user/:id', component: DeleteUserComponent, canActivate: [AdminRouteGuard] },
  { path: 'detail-user/:id', component: DetailUserComponent, canActivate: [AdminRouteGuard] },
  { path: 'users', component: ListUserComponent, canActivate: [AdminRouteGuard] },

  { path: 'change-password', component: ChangePasswordComponent, canActivate: [LoginRouteGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [LoginRouteGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'must-login', component: MustLoginComponent },
  { path: 'not-allowed', component: NotAllowedComponent },
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
