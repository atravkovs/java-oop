import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HardwareRepositoryService } from '../../../services/hardware.repository.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  errorMessage: string | null = null;

  @Input()
  deviceCode: number = 0;

  @Output()
  addUser: EventEmitter<string> = new EventEmitter();

  constructor(private hardwareRepository: HardwareRepositoryService) {}

  get email() {
    return this.addUserForm.get('email');
  }

  ngOnInit(): void {}

  addDeviceUser() {
    if (!this.addUserForm.valid) {
      return;
    }

    this.hardwareRepository
      .assignDevice(this.deviceCode, {
        email: this.email?.value,
      })
      .subscribe({
        next: () => {
          this.addUser.emit(this.email?.value);
          this.email?.setValue('');
        },
        error: ({ error }: HttpErrorResponse) => {
          this.errorMessage = error.message;
        },
      });
  }
}
