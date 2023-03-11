import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './page/device-list/device-list.component';
import { WrappersModule } from '../shared/wrappers/wrappers.module';
import { RouterModule, Routes } from '@angular/router';
import { CreateDeviceComponent } from './page/create-device/create-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceDetailsComponent } from './page/device-details/device-details.component';
import { AddUserComponent } from './page/device-details/add-user/add-user.component';
import { UserModule } from '../shared/user/user.module';
import { UserRole } from '../shared/authentication/models/user-role.enum';
import { AuthGuard } from '../auth/guard/auth.guard';
import { DeviceStatisticsComponent } from './page/device-details/device-statistics/device-statistics.component';
import { DeviceUsersComponent } from './page/device-details/device-users/device-users.component';
import { MemoryGraphComponent } from './page/device-details/device-statistics/memory-graph/memory-graph.component';
import { CpuGraphComponent } from './page/device-details/device-statistics/cpu-graph/cpu-graph.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateDeviceComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.Admin],
    },
  },
  {
    path: ':deviceId',
    component: DeviceDetailsComponent,
  },
  {
    path: '',
    component: DeviceListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.Admin],
    },
  },
];

@NgModule({
  declarations: [
    DeviceListComponent,
    CreateDeviceComponent,
    DeviceDetailsComponent,
    AddUserComponent,
    DeviceUsersComponent,
    DeviceStatisticsComponent,
    MemoryGraphComponent,
    CpuGraphComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    WrappersModule,
    UserModule,
    FormsModule,
    NgChartsModule,
  ],
})
export class DevicesModule {}
