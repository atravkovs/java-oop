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
import { FinancialStatementsComponent } from './components/financial-statements/financial-statements.component';
import { DataEntryComponent } from './components/data-entry/data-entry.component';
import { NgChartsModule } from 'ng2-charts';
import { YearGraphComponent } from './components/year-graph/year-graph.component';
import { CompanyRowComponent } from './components/company-row/company-row.component';
import { ComparisonComponent } from './page/comparison/comparison.component';
import { TopsComponent } from './page/tops/tops.component';
import { TopCompaniesComponent } from './components/top-companies/top-companies.component';
import { CountryMapComponent } from './components/country-map/country-map.component';

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
  {
    path: 'compare',
    component: ComparisonComponent,
  },
  {
    path: 'tops',
    component: TopsComponent,
  },
];

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    CompanyDetailsComponent,
    FinancialStatementsComponent,
    DataEntryComponent,
    YearGraphComponent,
    CompanyRowComponent,
    ComparisonComponent,
    TopsComponent,
    TopCompaniesComponent,
    CountryMapComponent,
  ],
  imports: [
    UserModule,
    CommonModule,
    ReactiveFormsModule,
    AuthenticationModule,
    RouterModule.forChild(routes),
    TranslateModule,
    WrappersModule,
    FormsModule,
    NgChartsModule,
  ],
})
export class DashboardModule {}
