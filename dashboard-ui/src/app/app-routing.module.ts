import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './layout/error404/error404.component';
import { AuthGuard } from './module/auth/guard/auth.guard';
import { UserRole } from './module/shared/authentication/models/user-role.enum';

const routes: Routes = [
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: 'devices',
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.Admin, UserRole.User],
    },
    loadChildren: () =>
      import('./module/devices/devices.module').then((m) => m.DevicesModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./module/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.Admin],
    },
  },
  {
    path: '',
    loadChildren: () =>
      import('./module/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.Admin, UserRole.User],
    },
  },
  {
    path: '',
    loadChildren: () =>
      import('./module/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
