import { HttpErrorResponse } from '@angular/common/http';
import { HardwareRepositoryService } from './../../services/hardware.repository.service';
import { NewDevice } from './../../models/new-device.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NewDeviceResponse } from '../../models/new-device-response.model';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss'],
})
export class CreateDeviceComponent implements OnInit {
  createDeviceForm: FormGroup = new FormGroup({
    deviceName: new FormControl('', [Validators.required]),
  });

  errorMessage: string | null = null;

  newDeviceResponse: NewDeviceResponse | null = null;

  constructor(
    private hardwareRepository: HardwareRepositoryService
  ) {}

  ngOnInit(): void {}

  get deviceName() {
    return this.createDeviceForm.get('deviceName');
  }

  createDevice() {
    if (!this.createDeviceForm.valid) {
      return;
    }

    const newDevice: NewDevice = {
      name: this.deviceName?.value,
    };

    this.hardwareRepository.createDevice(newDevice).subscribe({
      next: (response) => {
        this.newDeviceResponse = response;
        this.createDeviceForm.reset();
      },
      error: ({ error }: HttpErrorResponse) => {
        this.errorMessage = error.message;
      },
    });
  }
}
