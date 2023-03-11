import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListByEmailsComponent } from './component/user-list-by-emails/user-list-by-emails.component';
import { WrappersModule } from '../wrappers/wrappers.module';

@NgModule({
  declarations: [UserListByEmailsComponent],
  imports: [CommonModule, WrappersModule],
  exports: [UserListByEmailsComponent],
})
export class UserModule {}
