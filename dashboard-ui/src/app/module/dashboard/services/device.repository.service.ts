import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../../devices/models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceRepositoryService {
  constructor(private http: HttpClient) {}

  getUserDevices(): Observable<Device[]> {
    return this.http.get<Device[]>('/api/hardware/device');
  }
}
