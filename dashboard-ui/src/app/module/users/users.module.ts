import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './page/user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { WrappersModule } from '../shared/wrappers/wrappers.module';
import { UserModule } from '../shared/user/user.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
];

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserModule,
    FormsModule,
    RouterModule.forChild(routes),
    WrappersModule,
  ],
})
export class UsersModule {}
