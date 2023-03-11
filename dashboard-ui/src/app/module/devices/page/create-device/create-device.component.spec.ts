import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HardwareRepositoryService } from '../../services/hardware.repository.service';

import { CreateDeviceComponent } from './create-device.component';

describe('CreateDeviceComponent', () => {
  let component: CreateDeviceComponent;
  let fixture: ComponentFixture<CreateDeviceComponent>;
  let hardwareRepositoryService: HardwareRepositoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDeviceComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDeviceComponent);
    component = fixture.componentInstance;
    hardwareRepositoryService = TestBed.inject(HardwareRepositoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create device', () => {
    spyOn(hardwareRepositoryService, 'createDevice').and.returnValue(
      of({
        device: {
          code: 123,
          name: 'Test 123',
          userCount: 0,
        },
        token: 'token'
      })
    );

    component.deviceName?.setValue('Test 123');

    component.createDevice();

    expect(hardwareRepositoryService.createDevice).toHaveBeenCalledWith({
      name: 'Test 123',
    });
  });

  it('should not create device if name is empty', () => {
    spyOn(hardwareRepositoryService, 'createDevice').and.returnValue(
      of({
        device: {
          code: 123,
          name: 'Test 123',
          userCount: 0,
        },
        token: 'token'
      })
    );

    component.createDevice();

    expect(hardwareRepositoryService.createDevice).not.toHaveBeenCalled();
  });
});
