import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  map,
  Observable,
  of,
  shareReplay,
  Subscription,
  switchMap,
} from 'rxjs';
import { AuthService } from 'src/app/module/shared/authentication/services/auth.service';
import { Device } from '../../models/device.model';
import { HardwareRepositoryService } from '../../services/hardware.repository.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent implements OnInit {
  deviceId$: Observable<number> | null = null;
  device$: Observable<Device> | null = null;
  deviceError$: Observable<any> | null = null;

  constructor(
    private route: ActivatedRoute,
    private hardwareRepository: HardwareRepositoryService,
    private authService: AuthService
  ) {}

  stringify(text: any) {
    return JSON.stringify(text);
  }

  ngOnInit(): void {
    this.deviceId$ = this.route.params.pipe(
      map((params) => {
        const deviceId = params['deviceId'];

        return +deviceId;
      })
    );

    this.device$ = this.deviceId$.pipe(
      switchMap((deviceId) => {
        return this.hardwareRepository.getDeviceByCode(deviceId);
      }),
      shareReplay(1)
    );

    this.deviceError$ = this.device$.pipe(catchError((err) => of(err)));
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
