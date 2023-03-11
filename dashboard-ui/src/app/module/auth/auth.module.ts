import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import { AuthCardComponent } from './component/auth-card/auth-card.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './page/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from '../shared/authentication/authentication.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, AuthCardComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthenticationModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
