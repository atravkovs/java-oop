import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { TranslateModule } from '@ngx-translate/core';
import { WrappersModule } from '../shared/wrappers/wrappers.module';
import { ProfileComponent } from './page/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from '../shared/user/user.module';
import { AuthenticationModule } from '../shared/authentication/authentication.module';
import { CompanyDetailsComponent } from './page/company-details/company-details.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
  {
    path: 'company/:id',
    component: CompanyDetailsComponent,
  },
];

@NgModule({
  declarations: [MainComponent, ProfileComponent, CompanyDetailsComponent],
  imports: [
    UserModule,
    CommonModule,
    ReactiveFormsModule,
    AuthenticationModule,
    RouterModule.forChild(routes),
    TranslateModule,
    WrappersModule,
    FormsModule,
  ],
})
export class DashboardModule {}
