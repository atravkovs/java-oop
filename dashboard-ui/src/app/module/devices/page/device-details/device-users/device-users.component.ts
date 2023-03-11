import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Device } from '../../../models/device.model';
import { HardwareRepositoryService } from '../../../services/hardware.repository.service';

@Component({
  selector: 'app-device-users',
  templateUrl: './device-users.component.html',
  styleUrls: ['./device-users.component.scss'],
})
export class DeviceUsersComponent implements OnInit, OnDestroy {
  @Input()
  deviceCode: number = 0;

  emails: string[] = [];
  deviceUserEmails$: Subscription | null = null;

  constructor(private hardwareRepository: HardwareRepositoryService) {}

  ngOnInit(): void {
    this.deviceUserEmails$ = this.hardwareRepository
      .getDeviceUsers(this.deviceCode)
      .pipe(map((deviceUser) => deviceUser.map((user) => user.userEmail)))
      .subscribe((emails) => (this.emails = emails));
  }

  addEmail(email: string) {
    this.emails = [...this.emails, email];
  }

  deleteUser(userEmail: string): void {
    this.hardwareRepository
      .removeDeviceUser(this.deviceCode, userEmail)
      .subscribe(() => {
        this.emails = this.emails.filter((email) => email !== userEmail);
      });
  }

  ngOnDestroy(): void {
    if (this.deviceUserEmails$) {
      this.deviceUserEmails$.unsubscribe();
    }
  }
}
