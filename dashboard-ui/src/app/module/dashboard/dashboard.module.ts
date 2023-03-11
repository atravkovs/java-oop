import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { TranslateModule } from '@ngx-translate/core';
import { WrappersModule } from '../shared/wrappers/wrappers.module';
import { ProfileComponent } from './page/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserModule } from '../shared/user/user.module';
import { AuthenticationModule } from '../shared/authentication/authentication.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [MainComponent, ProfileComponent],
  imports: [
    UserModule,
    CommonModule,
    ReactiveFormsModule,
    AuthenticationModule,
    RouterModule.forChild(routes),
    TranslateModule,
    WrappersModule,
  ],
})
export class DashboardModule {}
