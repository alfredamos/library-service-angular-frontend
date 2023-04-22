import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DeleteItemComponent, NavigationBarComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NavigationBarComponent,
    DeleteItemComponent,
  ],
})
export class SharedModule {}
