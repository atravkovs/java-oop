import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HardwareRepositoryService } from '../../../services/hardware.repository.service';

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let hardwareRepositoryService: HardwareRepositoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    hardwareRepositoryService = TestBed.inject(HardwareRepositoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add device user', () => {
    spyOn(hardwareRepositoryService, 'assignDevice').and.returnValue(
      of({
        deviceCode: 123,
        userEmail: 'test@test.com',
      })
    );

    component.deviceCode = 123;
    component.email?.setValue('test@test.com');

    component.addDeviceUser();

    expect(hardwareRepositoryService.assignDevice).toHaveBeenCalledWith(123, {
      email: 'test@test.com'
    });
  });

  it('should not add device user if email is invalid', () => {
    spyOn(hardwareRepositoryService, 'assignDevice').and.returnValue(
      of({
        deviceCode: 123,
        userEmail: 'test@test.com',
      })
    );

    component.deviceCode = 123;
    component.email?.setValue('test');

    component.addDeviceUser();

    expect(hardwareRepositoryService.assignDevice).not.toHaveBeenCalled();
  });

});
