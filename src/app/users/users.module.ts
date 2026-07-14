import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from '@app/users/users-routing.module';
import { LayoutComponent } from '@app/users/layout/layout.component';
import { ListComponent } from '@app/users/list/list.component';
import { AddEditComponent } from '@app/users/add-edit/add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
  ]
})
export class UsersModule { }