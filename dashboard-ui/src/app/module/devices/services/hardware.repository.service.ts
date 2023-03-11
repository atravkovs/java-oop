import { NewDevice } from './../models/new-device.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Page } from '../../shared/models/page.model';
import { Device } from '../models/device.model';
import { NewDeviceUser } from '../models/new-device-user.model';
import { DeviceUser } from '../models/device-user.model';
import { DataPoint, DataPointDTO } from '../models/data-point.model';
import { NewDeviceResponse } from '../models/new-device-response.model';

@Injectable({
  providedIn: 'root',
})
export class HardwareRepositoryService {
  constructor(private http: HttpClient) {}

  getDeviceByCode(code: number): Observable<Device> {
    return this.http.get<Device>(`/api/hardware/device/${code}`);
  }

  getDevices(query: {
    search?: string;
    page?: number;
  }): Observable<Page<Device>> {
    return this.http.get<Page<Device>>('/api/hardware/device/list', {
      params: query,
    });
  }

  createDevice(device: NewDevice): Observable<NewDeviceResponse> {
    return this.http.post<NewDeviceResponse>(`/api/hardware/device`, device);
  }

  getDeviceUsers(deviceCode: number): Observable<DeviceUser[]> {
    return this.http.get<DeviceUser[]>(
      `/api/hardware/device/${deviceCode}/users`
    );
  }

  assignDevice(
    deviceCode: number,
    newDeviceUser: NewDeviceUser
  ): Observable<DeviceUser> {
    return this.http.post<DeviceUser>(
      `/api/hardware/device/${deviceCode}/users`,
      newDeviceUser
    );
  }

  removeDeviceUser(deviceCode: number, userEmail: string): Observable<unknown> {
    return this.http.delete(
      `/api/hardware/device/${deviceCode}/users/${userEmail}`
    );
  }

  getStatistics(
    deviceCode: number,
    from: Date,
    to: Date,
    measurement: string,
    field: string
  ): Observable<DataPoint[]> {
    return this.http
      .get<DataPointDTO[]>(
        `/api/hardware/device/${deviceCode}/statistics/${measurement}`,
        {
          params: {
            from: from.toISOString(),
            to: to.toISOString(),
            measurement,
            field,
          },
        }
      )
      .pipe(
        map((dataPoints) =>
          dataPoints.map(({ time, value }) => ({ time: new Date(time), value }))
        )
      );
  }
}
