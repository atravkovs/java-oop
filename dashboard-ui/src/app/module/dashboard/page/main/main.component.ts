import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from 'src/app/module/devices/models/device.model';
import { User } from 'src/app/module/shared/user/models/user.model';
import { UserRepositoryService } from 'src/app/module/shared/user/services/user.repository.service';
import { DeviceRepositoryService } from '../../services/device.repository.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  user$: Observable<User> | null = null;
  devices$: Observable<Device[]> | null = null;

  constructor(
    private userRepository: UserRepositoryService,
    private deviceRepository: DeviceRepositoryService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userRepository.getCurrentUser();
    this.devices$ = this.deviceRepository.getUserDevices();
  }
}
